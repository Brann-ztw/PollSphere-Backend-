"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Uncomment in production
// if(process.env.PORT === undefined) throw new Error('The PORT is undefined.');
// if(process.env.MONGO_URI === undefined) throw new Error('The MONGO_URI is undefined.');
exports.config = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    jwt_secret: process.env.JWT_SECRET || 'secret',
};
