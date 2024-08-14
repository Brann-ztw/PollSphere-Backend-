"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostControll = void 0;
const validateRequestBody_1 = require("../../validators/validateRequestBody");
const createPost_1 = require("../../collections/post/createPost");
const createPostControll = async (req, res) => {
    try {
        const { owner, title, description, options } = req.body;
        if (!(0, validateRequestBody_1.validateRequestBody)(req.body, ['owner', 'title', 'description', 'options'])) {
            return res.status(400).json({ success: false, message: 'A parameter is undefined' });
        }
        const resultMessage = await (0, createPost_1.createPost)(owner, title, description, options);
        if (resultMessage === 'Error creating post') {
            return res.status(500).json({ success: false, message: 'Error creating post' });
        }
        return res.status(201).json({ success: true, message: 'Post created successfully' });
    }
    catch (error) {
        console.error('Error in createPostController:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.createPostControll = createPostControll;
