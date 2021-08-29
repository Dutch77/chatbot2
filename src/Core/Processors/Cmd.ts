import {ProcessorInterface} from '../ProcessorInterface';
import {Connection} from 'typeorm';
import {doEval} from './Eval';
import {Command} from '@/Entity/Command';

export default class Cmd implements ProcessorInterface {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getCommandName() {
    return '$cmd';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - loads command`;
  }

  async respondToCommand(commandName: string) {
    try {
      const command = await this.connection.manager.getRepository(Command).findOneOrFail({
        where: {
          name: commandName,
        },
        order: {
          id: 'DESC',
        },
      });
      return {message: doEval(command.value)};
    } catch (e) {
      return {message: e.message};
    }
  }
}
