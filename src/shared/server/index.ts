/**
 * Encapsulate server initialization and return server to index.js from root
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import logger from './middlewares/logger';
import auth from './middlewares/auth';
import exception from './middlewares/exception';

const app = express();


app.use(bodyParser.json());
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  app.use(logger);
}
app.use(auth);
app.use(exception);

export default app;