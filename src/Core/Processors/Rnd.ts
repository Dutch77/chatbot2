import _ from 'lodash';
import {ProcessorInterface} from '../ProcessorInterface';

export default class Rnd implements ProcessorInterface {
  getCommandName() {
    return '$rnd';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - divides text by comma and select one of them. ($rnd a, b, c) => b`;
  }

  async respondToCommand(script: string) {
    if (!_.isString(script)) {
      return {message: null};
    }
    const array = script.trim().split(',');
    return {
      message: _.shuffle(array)
        .pop()
        .trim(),
    };
  }
}
