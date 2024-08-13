"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmail = exports.getUsers = void 0;
const database_1 = require("../../config/database");
const getUsers = () => {
    const db = (0, database_1.getDb)();
    return db.collection('Users');
};
exports.getUsers = getUsers;
const getUser = async (query) => {
    const userCollection = await (0, exports.getUsers)();
    return userCollection.findOne(query);
};
const getUserByEmail = (email) => getUser({ email });
exports.getUserByEmail = getUserByEmail;
const getUserById = (_id) => getUser({ _id });
exports.getUserById = getUserById;
