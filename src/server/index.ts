/**
 * Encapsulate server initialization and return server to index.js from root
 */
import express from 'express';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());

export default app;