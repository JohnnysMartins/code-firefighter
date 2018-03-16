let server = require('../../server');

const checkModel = require('../../models/model-checker').checkModel;
const databaseModel = require('../../models/database-model').model;
const mongodb = require('../../database/mongodb-client');

server.post('/databases/insert', (req, res) => {
    mongodb.executeFunction(async (db, client) => {
        try {
            if (checkModel(req.body.object, databaseModel)) {
                const collection = db.collection(req.body.dbName);
                let err, result = await collection.insert(req.body.object);
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
            const collection = db.collection('test');
            let err, result = await collection.find({_id, name}).toArray();
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