/**
 * Encapsulate server initialization and return server to index.js from root
 */
let express = require('express');
let bodyParser = require('body-parser')
let app = express();

app.use(bodyParser.json());

module.exports = app;