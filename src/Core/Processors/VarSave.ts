import _ from 'lodash';
import {ProcessorInterface} from '../ProcessorInterface';
import {Connection} from 'typeorm';
import {Variable} from '@/Entity/Variable';

export default class VarSave implements ProcessorInterface {
  protected connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getCommandName() {
    return '$varSave';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - saves variable ($varSave <varName> <varValue>)`;
  }

  async respondToCommand(text: string) {
    if (!_.isString(text)) {
      return null;
    }
    try {
      const regex = /(\w+)(\s)+((.|\s)+)/;
      const matches = regex.exec(text);
      const key = _.get(matches, [1]);
      const value = _.get(matches, [3]);
      const variable = new Variable();
      variable.name = key;
      variable.value = value;
      await this.connection.manager.getRepository(Variable).save(variable);
      return 'Saved';
    } catch (e) {
      return e.message;
    }
  }
}
