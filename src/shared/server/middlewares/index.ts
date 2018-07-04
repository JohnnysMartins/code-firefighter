import server from '../index';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import logger from './logger';
import auth from './auth';
import exception from './exception';

export default {
  initMiddlewares() {
    server.use(bodyParser.json());
    server.use(cors())

    if (process.env.NODE_ENV !== 'production') {
      server.use(logger);
    }
    server.use(auth);
    server.use(exception);
  }
}