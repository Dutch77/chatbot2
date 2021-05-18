import readline from 'readline';
import {MessageHandler} from '@/Core/MessageHandler';

const ask = (rl: readline.Interface, messageHandler: MessageHandler) => {
  rl.question('Enter expression: ', async (expression: string) => {
    const response = await messageHandler.processMessage(expression);
    console.log(response);
    ask(rl, messageHandler);
  });
};

export default async ({messageHandler}) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  ask(rl, messageHandler);
  return {};
};
