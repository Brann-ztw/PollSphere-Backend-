"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const database_1 = require("../../config/database");
const getUsers = () => {
    const db = (0, database_1.getDb)();
    return db.collection('Users');
};
exports.getUsers = getUsers;
