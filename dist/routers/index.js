"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const authRouter_1 = require("./authRouter");
const postRouter_1 = require("./postRouter");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/auth', authRouter_1.routerAuth);
exports.app.use('/post', postRouter_1.routerPost);
