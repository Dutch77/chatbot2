import _ from 'lodash';
import {ProcessorInterface} from '../ProcessorInterface';

export default class Help implements ProcessorInterface {
  private processors: any;

  constructor(processors) {
    this.processors = processors;
  }
  getCommandName() {
    return '$help';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - help`;
  }

  async respondToCommand() {
    return {
      message: _.chain(this.processors)
        .map((processor) => processor.getCommandDescription() || processor.getCommandName())
        .join('\n')
        .value(),
    };
  }
}
