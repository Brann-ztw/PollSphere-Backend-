"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.getPostCollection = void 0;
const database_1 = require("../../config/database");
const getPostCollection = () => {
    const db = (0, database_1.getDb)();
    return db.collection('Posts');
};
exports.getPostCollection = getPostCollection;
const getAllPosts = async () => {
    const postCollection = (0, exports.getPostCollection)();
    return postCollection.find({}).toArray();
};
exports.getAllPosts = getAllPosts;
