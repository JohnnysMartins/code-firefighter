let server = require('../../server');

const checkModel = require('../../models/model-checker').checkModel;
const databaseModel = require('../../models/database-model').model;
const mongodb = require('../../database/mongodb-client');

server.post('/databases/insert', (req, res) => {
    // Connect to mongo instance
    mongodb.executeFunction(async (db, client) => {
        try {
            // Check if the post object have a model equal to our databaseModel
            if (checkModel(req.body.object, databaseModel)) {
                // Get the db collection
                const collection = db.collection(req.body.dbName);
                // Insert the object
                let err, result = await collection.insert(req.body.object);
                // TODO: Move to ~/exceptions/
                if (err) {
                    throw 'DatabaseError:Insert Failed', err;
                }
                res.send(result);
            }
            
        }
        catch (err) {
            console.error(err.name, err.message);
            res.send(err);
        }
    });
});

server.get('/databases/all', (req, res) => {
    mongodb.executeFunction(async (db, client) => {
        try {
            const collection = db.collection(req.body.dbName);
            let err, result = await collection.find({_id, name}).toArray();
            // TODO: Move to ~/exceptions/
            if (err) {
                throw 'DatabaseError', err;
            }
            res.send(result);
        }
        catch (err) {
            console.error(err);
        }
    });
});