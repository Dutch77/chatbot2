import {AppContext} from 'index';

declare global {
  namespace Express {
    interface Request {
      context: AppContext
    }
  }
}
