import _ from 'lodash';

type Out = (...args)=> void;

export class MessageHandler {
  private processors: any;
  private out: Out;

  constructor(processors, out: Out) {
    this.processors = processors;
    this.out = out;
  }
  async processMessage(message: string): Promise<string> {
    const regex = /(\$\w+)(\s+)?((.|\s)+)?/;
    const matches = regex.exec(message);
    const command = _.get(matches, [1]);
    const value = _.get(matches, [3]);
    const processor = this.getProcessor(command);
    if (processor) {
      this.out('Processor:', processor);
      const responseMessage = await processor.respondToCommand(value);
      this.out('Response message:', responseMessage);
      return responseMessage;
    }
  }

  private getProcessor(command) {
    return _.find(this.processors, (processor) => processor.getCommandName() === command);
  }
}

export default async ({isSandbox, processors}) => {
  return {
    messageHandler: new MessageHandler(processors, isSandbox ? ()=>null : console.log),
  };
};
