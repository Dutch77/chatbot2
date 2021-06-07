import {ProcessorInterface} from '../ProcessorInterface';
import {Connection} from 'typeorm';
import {Variable} from '@/Entity/Variable';

export default class Var implements ProcessorInterface {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getCommandName() {
    return '$var';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - loads variable`;
  }

  async respondToCommand(variableName: string) {
    try {
      const variable = await this.connection.manager.getRepository(Variable).findOneOrFail({
        where: {
          name: variableName,
        },
        order: {
          id: 'DESC',
        },
      });
      return variable.value;
    } catch (e) {
      return e.message;
    }
  }
}
