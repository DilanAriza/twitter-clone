//Dependences
const { string } = require('@hapi/joi');
const { MongoClient, ObjectId } = require('mongodb');

//config
const { config } = require('../config/index');

//Console Messages
const { consoleSuccess, consoleError } = require('../utils/messages/console/consoleFunctions');


//VARS
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }

                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return MongoLib.connection;
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
        });
    }

    getAll(collection, query) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .find(query)
                .toArray();
        });
    }

    create(collection, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection).insertOne(data);
            })
            .then(result => result.insertedId)
    }
}

module.exports = MongoLib;