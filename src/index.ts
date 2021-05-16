import './dotenv';
import 'module-alias/register';
import {createContext as _createContext} from '@/DependecyInjection/di';
import registerFacebook from '@/Modules/Facebook';

export const createContext = async () => {
  const contextDefinition = _createContext({
    facebookEmail: process.env.FACEBOOK_EMAIL,
    facebookPassword: process.env.FACEBOOK_PASSWORD,
  })
    .register(registerFacebook);
  return await contextDefinition.resolve();
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type AppContext = ThenArg<ReturnType<typeof createContext>>

(async () => {
  console.log('Starting.');
  await createContext();
})();
