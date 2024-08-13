"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.getPost = void 0;
const database_1 = require("../../config/database");
const getPost = () => {
    const db = (0, database_1.getDb)();
    return db.collection('Post');
};
exports.getPost = getPost;
const getPosts = async () => {
    const userCollection = await (0, exports.getPost)();
    return userCollection.findOne();
};
exports.getPosts = getPosts;
