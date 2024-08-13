"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostControll = void 0;
const getPosts_1 = require("../../collections/post/getPosts");
const getPostControll = async (req, res) => {
    try {
        let post = await (0, getPosts_1.getPosts)();
        return res.status(200).json(post);
    }
    catch (error) {
        console.log('Error in controller getPost: ', error);
        return res.status(500).json({ succes: false, message: 'Internal server error' });
    }
};
exports.getPostControll = getPostControll;
