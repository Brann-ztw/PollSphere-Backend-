import { Request, Response } from "express";
import { validateRequestBody } from "../../validators/validateRequestBody";
import { createPost } from "../../collections/post/createPost";
import { Post } from "../../types/PostModel";

export const createPostControll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { owner, title, description, options } = req.body as Post;

    if (!validateRequestBody<Post>(req.body, ['owner', 'title', 'description', 'options'])) {
      return res.status(400).json({ success: false, message: 'A parameter is undefined' });
    }

    const resultMessage: string = await createPost(owner, title, description, options);

    if (resultMessage === 'Error creating post') {
      return res.status(500).json({ success: false, message: 'Error creating post' });
    }

    return res.status(201).json({ success: true, message: 'Post created successfully' });
  } catch (error) {
    console.error('Error in createPostController:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
