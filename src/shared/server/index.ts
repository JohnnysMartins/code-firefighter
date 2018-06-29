/**
 * Encapsulate server initialization and return server to index.js from root
 */
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

export default app;