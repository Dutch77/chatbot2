import {FacebookManager} from '@/Modules/Facebook/FacebookManager';

const APP_STATE_PATH = './appState.json';

export default async ({facebookEmail, facebookPassword}) => {
  const facebookManager = new FacebookManager(facebookEmail, facebookPassword, APP_STATE_PATH);
  await facebookManager.run();
  return {
    facebookManager,
  };
};
