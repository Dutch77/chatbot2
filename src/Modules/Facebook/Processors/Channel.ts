import {ProcessorInterface} from '@/Core/ProcessorInterface';
import {ProcessedMessage} from '@/Core/MessageHandler';
import {appContext} from '../../../index';
import {FacebookManager} from '@/Modules/Facebook/FacebookManager';
import {AnyIncomingMessage} from 'ts-messenger-api/dist/lib/types/incomingMessages';
import {map} from 'lodash';

export default class Channel implements ProcessorInterface {
  getCommandName(): string {
    return '$channel';
  }
  getCommandDescription(): string {
    return 'Notifies everyone in channel.';
  }
  async respondToCommand(body: string, message: AnyIncomingMessage): Promise<ProcessedMessage> {
    try {
      // @ts-ignore lies
      const facebookManager: FacebookManager = appContext.facebookManager;
      const api = facebookManager.getApi();
      const threadInfo = await api.getThreadInfo(message.threadId);
      return {
        message: 'Notifying everyone in channel. ' + map(threadInfo.participantIds, (id, index) =>
          'person' + (index + 1)).join(' '),
        mentions: map(threadInfo.participantIds, (id, index) => {
          return {
            id,
            name: 'person' + (index + 1),
          };
        }),
      };
    } catch (e) {
      return {message: e.message};
    }
  }
}
