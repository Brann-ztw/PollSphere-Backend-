import { Request, Response } from "express";
import { getAllPosts } from "../../collections/post/getPosts";
import { PostModel } from "../../types/PostModel";
import { WithId } from "mongodb";

export const getPostControll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts: WithId<PostModel>[] = await getAllPosts();

    if (posts === null) {
      return res.status(200).json({ success: true, message: 'No posts found', data: [] });
    }

    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Error in controller getPost:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
