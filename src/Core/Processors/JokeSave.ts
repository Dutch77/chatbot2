import _ from 'lodash';
import {ProcessorInterface} from '../ProcessorInterface';
import {Connection} from 'typeorm';
import {Joke} from '@/Entity/Joke';

export default class JokeSave implements ProcessorInterface {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  getCommandName() {
    return '$jokeSave';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - saves joke ($jokeSave text of joke here)`;
  }

  async respondToCommand(jokeText: string) {
    if (!_.isString(jokeText)) {
      return null;
    }
    try {
      const joke = new Joke();
      joke.joke = jokeText;
      await this.connection.manager.getRepository(Joke).save(joke);
      return 'Saved';
    } catch (e) {
      return e.message;
    }
  }
}
