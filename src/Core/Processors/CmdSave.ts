import _ from 'lodash';
import {ProcessorInterface} from '../ProcessorInterface';
import {Connection} from 'typeorm';
import {Command} from '@/Entity/Command';

export default class CmdSave implements ProcessorInterface {
  protected connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getCommandName() {
    return '$cmdSave';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - saves command ($varSave <commandName> <command>)`;
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
      const variable = new Command();
      variable.name = key;
      variable.value = value;
      await this.connection.manager.getRepository(Command).save(variable);
      return {message: 'Saved'};
    } catch (e) {
      return {message: e.message};
    }
  }
}
