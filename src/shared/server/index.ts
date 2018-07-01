/**
 * Encapsulate server initialization and return server to index.js from root
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import logger from './middlewares/logger';
import exception from './middlewares/exception';

const app = express();


app.use(bodyParser.json());
app.use(cors())

app.use(logger);
app.use(exception);

export default app;