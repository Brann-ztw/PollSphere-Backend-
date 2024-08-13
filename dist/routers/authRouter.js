"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const registerControll_1 = require("../controllers/auth/registerControll");
const loginControll_1 = require("../controllers/auth/loginControll");
const authMiddelware_1 = require("../middleware/authMiddelware");
exports.routerAuth = (0, express_1.Router)();
exports.routerAuth.post('/register', authMiddelware_1.authMiddleware, registerControll_1.registerControll);
exports.routerAuth.post('/login', authMiddelware_1.authMiddleware, loginControll_1.loginControll);
// add authMiddleware for the front
