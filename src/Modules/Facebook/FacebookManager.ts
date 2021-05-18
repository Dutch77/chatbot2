import fs from 'fs';
import facebookLogin from 'ts-messenger-api';
import {AnyIncomingMessage, IncomingMessageType} from 'ts-messenger-api/dist/lib/types/incomingMessages';
import {MessageHandler} from '@/Core/MessageHandler';

export class FacebookManager {
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
    let loginData;
    if (fs.existsSync(this.appStatePath)) {
      loginData = {
        appState: JSON.parse(fs.readFileSync(this.appStatePath).toString()),
      };
    } else {
      loginData = {
        email: this.email,
        password: this.password,
      };
    }

    try {
      const api = await facebookLogin(loginData, {
        listenEvents: true,
      });
      fs.writeFileSync(this.appStatePath, JSON.stringify(api.getAppState()));

      await api.listen();

      api.listener.addListener('message', async (message: AnyIncomingMessage) => {
        if (message.type === IncomingMessageType.MessageRegular) {
          const processedMessage = await this.messageHandler.processMessage(message.body);
          if (processedMessage) {
            await api.sendMessage({body: processedMessage}, message.threadId);
          }
        }
      });

      api.listener.addListener('error', (error) => console.error(error));
    } catch (e) {
      console.error('Failed to login.', e.message);
    }
  }
}
