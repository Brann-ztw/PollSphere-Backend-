"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginControll = void 0;
const validateRequestBody_1 = require("../../validators/validateRequestBody");
const generateToken_1 = require("../../utils/generateToken");
const getUsers_1 = require("../../collections/auth/getUsers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginControll = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(0, validateRequestBody_1.validateRequestBody)(req.body, ['email', 'password'])) {
            return res.status(404).json({ succes: false, message: 'A parameter is undefined' });
        }
        const validEmail = /^[\w\DÑñ]+([.-_+]?\w+)*@[a-zA-Z\d-]+(\.[a-zA-Z]{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(404).json({ succes: false, message: 'Invalid email format' });
        }
        if (password.length <= 8) {
            return res.status(404).json({ succes: false, message: 'Password too short, must be at least 8 characters long' });
        }
        if (password.length >= 30) {
            return res.status(404).json({ succes: false, message: 'Password too large, must be at least 8 characters long' });
        }
        const userExistent = await (0, getUsers_1.getUserByEmail)(email);
        if (!userExistent) {
            return res.status(400).json({ succes: false, message: 'Invalid credentials' });
        }
        const token = (0, generateToken_1.generateToken)(userExistent._id);
        const isPasswordValid = await bcrypt_1.default.compare(password, userExistent.password);
        if (!isPasswordValid) {
            return res.status(400).json({ succes: false, message: 'Invalid password' });
        }
        return res.status(201).json({ sucess: true, message: 'Logged in user', token: token });
    }
    catch (error) {
        console.log('Error in controller register: ', error);
        return res.status(500).json({ succes: false, message: 'Internal server error' });
    }
};
exports.loginControll = loginControll;
