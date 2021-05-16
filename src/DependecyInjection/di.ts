import _ from 'lodash';

export type PlainObject = {
  [key: string]: any
  [key: number]: never
}

type NotPlainObject<T> = T extends PlainObject ? never : T;

type RegisterContext<T> = {
  register<O extends PlainObject>(factory: ((ctx: T)=>
    Promise<O>|O)): RegisterContext<T & { [key in keyof(O)]: O[key] }>
  __resolveFactory
  __registerOne
  __registerMultiple
  resolve(): Promise<T>
  ctx: Promise<T>
}


export type ExtractAppContext<T> = T extends RegisterContext<infer X> ? X : never

// export type ExtractAppContext<T> = T extends RegisterContext<any> ? T['__ctx'] : never


/**
 * @example
 * createContext({foo: 'bar'})
 .register('bar', () => Promise.resolve(12))
 .register('baz', () => 12)
 .register(() => ({
      'aa': 1,
      'bb': 'bb',
    }))
 .ctx.then((ctx) => ctx.aa)
 */
export const createContext = <T extends object>(ctx: T = <T>{}): RegisterContext<T> => {
  let lastPromise = Promise.resolve();
  return {
    register(...args) {
      if (args.length === 1) {
        lastPromise = lastPromise.then(() => this.__registerMultiple(...args));
      } else if (args.length === 2) {
        lastPromise = lastPromise.then(() => this.__registerOne(...args));
      } else {
        throw Error('Use register({name: value}) or register(name, value)');
      }
      return this;
    },
    async __resolveFactory(factory) {
      return _.isFunction(factory) ? await factory(ctx) : factory;
    },
    async __registerOne(name, factory) {
      const result = await this.__resolveFactory(factory);

      if (!_.isNil(result)) {
        ctx[name] = result;
      }

      return this;
    },
    async __registerMultiple(factory) {
      const results = await this.__resolveFactory(factory);

      if (_.isPlainObject(results)) {
        for (const key of Object.keys(results)) {
          ctx[key] = await results[key];
        }
      }

      return this;
    },
    resolve() {
      return lastPromise
        .then(() => ctx);
    },
    get ctx() {
      return this.resolve();
    },
  };
};
