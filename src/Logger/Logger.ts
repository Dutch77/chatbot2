import {
  Configuration,
  configure,
  getLogger,
} from 'log4js';

const createLogger = () => {
  configure({
    appenders: {chatbot: {type: 'file', filename: 'chatbot.log'}},
    categories: {default: {appenders: ['chatbot'], level: 'error'}},
  } as Configuration);
  return getLogger();
};

export default createLogger();
