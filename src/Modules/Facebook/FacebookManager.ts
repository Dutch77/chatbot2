import fs from 'fs';
import facebookLogin from 'ts-messenger-api';
import {AnyIncomingMessage, IncomingMessageType} from 'ts-messenger-api/dist/lib/types/incomingMessages';
import {MessageHandler} from '@/Core/MessageHandler';
import Logger from '@/Logger/Logger';
import Api from 'ts-messenger-api/dist/lib/api';
import {omit, reject} from 'lodash';
import {timeoutPromise} from '@/Helpers/timeoutPromise';

export class FacebookManager {
  private api: Api
  private email: string;
  private password: string;
  private appStatePath: string;
  private messageHandler: MessageHandler;

  constructor(
    email: string,
    password: string,
    appStatePath: string,
    messageHandler: MessageHandler,
  ) {
    this.email = email;
    this.password = password;
    this.appStatePath = appStatePath;
    this.messageHandler = messageHandler;
  }

  async run(): Promise<void> {
    await this.init();
  }

  async init() {
    if (this.api) {
      try {
        await this.api.logout();
      } catch (e) {
        Logger.error(e);
      }
    }

    try {
      await this.login();
      fs.writeFileSync(this.appStatePath, JSON.stringify(this.api.getAppState()));
      await this.registerListeners();
    } catch (e) {
      console.error('Failed to login.', e.message);
    }
  }

  async checkIfAlive() {
    try {
      // abort after 30s
      // todo remove logs
      console.log('debug is alive');
      console.log(new Date().toISOString());
      const result = await timeoutPromise(30 * 1000, this.api.getFriendsList());
      console.log(new Date().toISOString(), result.length);
      return true;
    } catch (e) {
      return false;
    }
  }

  getApi() {
    return this.api;
  }

  private async login() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.api = await facebookLogin(loginData, {
      listenEvents: true,
    });
  }

  private async registerListeners() {
    await this.api.listen();

    this.api.listener.addListener('message', async (message: AnyIncomingMessage) => {
      if (message.type === IncomingMessageType.MessageRegular) {
        const processedMessage = await this.messageHandler.processMessage(message.body, message);
        if (processedMessage) {
          await this.api.sendMessage({
            body: processedMessage.message,
            ...(omit(processedMessage, 'message')),
          }, message.threadId);
        }
      }
    });

    this.api.listener.addListener('error', (error) => Logger.error(error));
  }
}
