import {FacebookManager} from '@/Modules/Facebook/FacebookManager';

const APP_STATE_PATH = './appState.json';

const checkIfAlive = (facebookManager: FacebookManager, timeInSeconds: number = 300) => {
  setInterval(async () => {
    if (!(await facebookManager.checkIfAlive())) {
      await facebookManager.init();
    }
  }, timeInSeconds * 1000);
};

export default async ({facebookEmail, facebookPassword, messageHandler}) => {
  const facebookManager = new FacebookManager(facebookEmail, facebookPassword, APP_STATE_PATH, messageHandler);
  await facebookManager.run();
  checkIfAlive(facebookManager);

  return {
    facebookManager,
  };
};
