import _ from 'lodash';
import Eval from './Processors/Eval';

const PROCESSORS = {
  $eval: new Eval(),
};

export class MessageHandler {
  async processMessage(message: string): Promise<string> {
    const regex = /(\$\w+)(\s+)?((.|\s)+)?/;
    const matches = regex.exec(message);
    const command = _.get(matches, [1]);
    const value = _.get(matches, [3]);
    const processor = this.getProcessor(command);
    if (processor) {
      console.log('processor:', processor);
      const responseMessage = await processor.respondToCommand(value);
      console.log('responseMessage:', responseMessage);
      return responseMessage;
    }
  }

  private getProcessor(command) {
    return _.find(PROCESSORS, (processor) => processor.getCommandName() === command);
  }
}
