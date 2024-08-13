"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const registerControll_1 = require("../controllers/auth/registerControll");
const loginControll_1 = require("../controllers/auth/loginControll");
exports.routerAuth = (0, express_1.Router)();
exports.routerAuth.post('/register', registerControll_1.registerControll);
exports.routerAuth.post('/login', loginControll_1.loginControll);
