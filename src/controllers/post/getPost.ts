import { Request, Response } from "express";
import { getPosts } from "../../collections/post/getPosts";
import { PostModel } from "../../types/PostModel";
import { Collection } from "mongodb";

export const getPostControll = async(req: Request, res: Response) => {
  try {
    let post = await getPosts();
    return res.status(200).json(post);
  } catch (error) {
    console.log('Error in controller getPost: ', error);
    return res.status(500).json({succes: false, message: 'Internal server error'});
  }
};

