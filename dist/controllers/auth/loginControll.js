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
            return res.status(400).json({ success: false, message: 'A parameter is undefined' });
        }
        const validEmail = /^[\w\DÑñ]+([.-_+]?\w+)*@[a-zA-Z\d-]+(\.[a-zA-Z]{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        if (password.length < 8 || password.length > 30) {
            return res.status(400).json({ success: false, message: 'Password must be between 8 and 30 characters long' });
        }
        const userExistent = await (0, getUsers_1.getUserByEmail)(email);
        if (!userExistent) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, userExistent.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        const token = (0, generateToken_1.generateToken)(userExistent._id);
        return res.status(200).json({ success: true, message: 'User logged in successfully', token: token });
    }
    catch (error) {
        console.error('Error in login controller:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.loginControll = loginControll;
