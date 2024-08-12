"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const getUsers_1 = require("./getUsers");
const createUser = async (_id, name, dirname, age, email, password, phoneNumber) => {
    try {
        const users = (0, getUsers_1.getUsers)();
        await users.insertOne({
            _id: _id,
            name: name,
            dirname: dirname,
            age: age,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        });
        return 'User created successfully';
    }
    catch (error) {
        console.log('Error create User:', error);
        return 'Error create User';
    }
};
exports.createUser = createUser;
