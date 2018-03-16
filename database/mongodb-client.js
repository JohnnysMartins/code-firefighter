const MongoClient = require('mongodb').MongoClient;
const env = require('../config/env');

// Connection URL
const url = env.mongodb_url;
const bdName = require('../config/env').mongodb_database_name;

// Use connect method to connect to the server

module.exports = {
    async executeFunction(func) {
        try {
            let arr, client = await MongoClient.connect(url);
            const db = client.db(bdName);

            func(db, client);

            client.close();
        }
        catch (err) {
            console.error(err);
        }
    }
}