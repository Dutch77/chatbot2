import {FacebookManager} from '@/Modules/Facebook/FacebookManager';

const APP_STATE_PATH = './appState.json';

export default async ({facebookEmail, facebookPassword, messageHandler}) => {
  const facebookManager = new FacebookManager(facebookEmail, facebookPassword, APP_STATE_PATH, messageHandler);
  await facebookManager.run();
  return {
    facebookManager,
  };
};
