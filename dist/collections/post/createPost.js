"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const mongodb_1 = require("mongodb");
const getPosts_1 = require("./getPosts");
const createPost = async (owner, title, description, option) => {
    try {
        const postsCollection = await (0, getPosts_1.getPostCollection)();
        if (!owner || !title || !description || !option.length) {
            return 'Missing required fields';
        }
        const newPost = {
            _id: new mongodb_1.ObjectId(),
            owner,
            title,
            description,
            options: option,
            likes: 0,
            comment: [],
        };
        await postsCollection.insertOne(newPost);
        return 'Post created successfully';
    }
    catch (error) {
        console.error('Error creating post:', error);
        return 'Error creating post';
    }
};
exports.createPost = createPost;
