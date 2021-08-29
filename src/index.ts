import './dotenv';
import 'module-alias/register';
import {createContext as _createContext} from '@/DependecyInjection/di';
import {register as registerConnection} from '@/Connection';
import registerMessageHandler from '@/Core/MessageHandler';
import registerProcessors from '@/Core/Processors';
import registerFacebook from '@/Modules/Facebook';
import registerSandbox from '@/Modules/Sandbox';

export let appContext: AppContext;

export const createContext = async () => {
  const isSandbox = process.env.MDOE === 'sandbox';
  const contextDefinition = _createContext({
    facebookEmail: process.env.FACEBOOK_EMAIL,
    facebookPassword: process.env.FACEBOOK_PASSWORD,
    isSandbox,
  })
    .register(registerConnection)
    .register(registerProcessors)
    .register(registerMessageHandler);

  if (isSandbox) {
    contextDefinition.register(registerSandbox);
  } else {
    contextDefinition.register(registerFacebook);
  }

  return await contextDefinition.resolve();
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type AppContext = ThenArg<ReturnType<typeof createContext>>

(async () => {
  console.log('Starting.');
  appContext = await createContext();
})();
