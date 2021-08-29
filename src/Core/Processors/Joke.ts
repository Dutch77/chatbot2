import {ProcessorInterface} from '../ProcessorInterface';
import {Connection} from 'typeorm';
import {Joke as JokeEntity} from '@/Entity/Joke';

export default class Joke implements ProcessorInterface {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getCommandName() {
    return '$joke';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - prints a random joke`;
  }

  async respondToCommand(id: string) {
    try {
      let jokeEntity;
      if (id) {
        jokeEntity = await this.connection.manager.getRepository(JokeEntity).findOneOrFail(id);
      } else {
        jokeEntity = await this.connection.manager.getRepository(JokeEntity)
          .createQueryBuilder('jokes')
          .orderBy('RANDOM()')
          .limit(1)
          .getOne();
      }
      return {message: jokeEntity ? `${jokeEntity.joke} (${jokeEntity.id})` : null};
    } catch (e) {
      return {message: e.message};
    }
  }
}
