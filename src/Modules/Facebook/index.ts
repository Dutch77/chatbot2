import {FacebookManager} from '@/Modules/Facebook/FacebookManager';

const APP_STATE_PATH = './appState.json';

const periodicallyReconnect = (facebookManager: FacebookManager, timeInSeconds: number = (24 * 60 * 60)) => {
  setInterval(async () => {
    try {
      console.log('Reconnecting.');
      await facebookManager.reconnect();
      console.log('Done.');
    } catch (e) {
      console.error('Reconnect failed.', e.message);
      throw e;
    }
  }, timeInSeconds * 1000);
};

export default async ({facebookEmail, facebookPassword, messageHandler}) => {
  const facebookManager = new FacebookManager(facebookEmail, facebookPassword, APP_STATE_PATH, messageHandler);
  await facebookManager.run();
  periodicallyReconnect(facebookManager);

  return {
    facebookManager,
  };
};
