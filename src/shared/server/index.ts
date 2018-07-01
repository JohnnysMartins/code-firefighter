/**
 * Encapsulate server initialization and return server to index.js from root
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import logger from './middlewares/logger';

const app = express();

app.use(logger);

app.use(bodyParser.json());
app.use(cors())

export default app;