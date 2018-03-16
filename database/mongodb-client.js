const MongoClient = require('mongodb').MongoClient;
const env = require('../config/env');

// Connection URL
const url = env.mongodb_url;
const bdName = require('../config/env').mongodb_database_name;

// Use connect method to connect to the server

module.exports = {
    async executeFunction(func) {
        try {
            // Connect to a mongo instance
            let err, client = await MongoClient.connect(url);
            // Connect to a database from that instance
            const db = client.db(bdName);
            // Run something
            func(db, client);
            // Auto close connection
            client.close();
        }
        catch (err) {
            console.error(err);
        }
    }
}