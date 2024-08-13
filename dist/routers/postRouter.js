"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPost = void 0;
const express_1 = require("express");
const getPost_1 = require("../controllers/post/getPost");
const postMiddleware_1 = require("../middleware/postMiddleware");
exports.routerPost = (0, express_1.Router)();
exports.routerPost.get('/all', postMiddleware_1.postMiddleware, getPost_1.getPostControll);
