import _ from 'lodash';
import axios from 'axios';
import safeEval from 'safe-eval';
import {JSDOM} from 'jsdom';
import {ProcessorInterface} from '../ProcessorInterface';

export const doEval = async function(
  script: string,
  timeout: number = 10000
) {
  try {
    script = `(async (parameters) => eval(\`${script}\`))()`;
    const result = await safeEval(
      script,
      {
        _,
        axios,
        JSDOM,
      },
      {
        timeout: timeout,
      }
    );
    return `${result}`;
  } catch (e) {
    return `Error: ${e.message}`;
  }
};


export default class Eval implements ProcessorInterface {
  getCommandName() {
    return '$eval';
  }

  getCommandDescription() {
    return `${this.getCommandName()} - evaluate expression ($eval 2 * Math.PI * 6368) => 40011.32`;
  }

  async respondToCommand(script) {
    return {message: await doEval(script)};
  }
}
