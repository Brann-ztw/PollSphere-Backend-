"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerControll = void 0;
const validateRequestBody_1 = require("../../validators/validateRequestBody");
const mongodb_1 = require("mongodb");
const createUser_1 = require("../../collections/auth/createUser");
const generateToken_1 = require("../../utils/generateToken");
const getUsers_1 = require("../../collections/auth/getUsers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const registerControll = async (req, res) => {
    try {
        const { name, dirname, age, email, password, phoneNumber } = req.body;
        if (!(0, validateRequestBody_1.validateRequestBody)(req.body, ['name', 'dirname', 'age', 'email', 'password', 'phoneNumber'])) {
            return res.status(400).json({ success: false, message: 'A parameter is undefined' });
        }
        if (age < 13 || age > 99) {
            return res.status(400).json({ success: false, message: 'Invalid age, must be between 13 and 99 years old' });
        }
        const validEmail = /^[\w\DÑñ]+([.-_+]?\w+)*@[a-zA-Z\d-]+(\.[a-zA-Z]{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        if (password.length < 8 || password.length > 30) {
            return res.status(400).json({ success: false, message: 'Password must be between 8 and 30 characters long' });
        }
        const alphanumeric = /^[\w\D-]+$/;
        if (!alphanumeric.test(password)) {
            return res.status(400).json({ success: false, message: 'Insecure password, must include numbers, letters, and special characters' });
        }
        const validPhoneNumber = /^\d{10,}$/;
        if (!validPhoneNumber.test(phoneNumber)) {
            return res.status(400).json({ success: false, message: 'Invalid phone number, must be at least 10 digits and contain only numbers' });
        }
        const userExistent = await (0, getUsers_1.getUserByEmail)(email);
        if (userExistent) {
            return res.status(400).json({ success: false, message: 'User already registered' });
        }
        const _id = new mongodb_1.ObjectId();
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const createNewUser = await (0, createUser_1.createUser)(_id, name, dirname, age, email, hashedPassword, phoneNumber);
        if (createNewUser === 'Error create User') {
            return res.status(500).json({ success: false, message: 'Error creating user' });
        }
        const token = (0, generateToken_1.generateToken)(_id);
        return res.status(201).json({ success: true, message: 'User registered successfully', token: token });
    }
    catch (error) {
        console.log('Error in controller register:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.registerControll = registerControll;
