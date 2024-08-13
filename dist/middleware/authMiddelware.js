"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const mongodb_1 = require("mongodb");
const getUsers_1 = require("../collections/auth/getUsers");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            const token = authHeader.split(' ')[1];
            const decode = jsonwebtoken_1.default.verify(token, config_1.config.jwt_secret);
            const user = await (0, getUsers_1.getUserById)(new mongodb_1.ObjectId(decode.id));
            if (user) {
                return res.status(200).redirect('/');
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log('Error middlware(auth): ', error);
        return res.status(401).json({ message: 'Not authorized, token faild' });
    }
};
exports.authMiddleware = authMiddleware;
