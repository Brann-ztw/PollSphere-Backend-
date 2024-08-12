"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectDb = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
const MONGO_URI = config_1.config.mongo_uri;
let db;
const connectDb = async () => {
    try {
        const client = new mongodb_1.MongoClient(MONGO_URI);
        await client.connect();
        db = client.db('PollSphere');
        console.log('MongoDb connect');
        return client;
    }
    catch (error) {
        throw error;
    }
};
exports.connectDb = connectDb;
const getDb = () => {
    if (!db)
        throw new Error('db is undefined');
    return db;
};
exports.getDb = getDb;
