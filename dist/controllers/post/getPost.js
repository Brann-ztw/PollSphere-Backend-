"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostControll = void 0;
const getPosts_1 = require("../../collections/post/getPosts");
const getPostControll = async (req, res) => {
    try {
        const posts = await (0, getPosts_1.getAllPosts)();
        if (posts === null) {
            return res.status(200).json({ success: true, message: 'No posts found', data: [] });
        }
        return res.status(200).json({ success: true, data: posts });
    }
    catch (error) {
        console.error('Error in controller getPost:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.getPostControll = getPostControll;
