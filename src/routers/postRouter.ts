import { Router } from "express";
import { getPostControll } from "../controllers/post/getPost";
import { postMiddleware } from "../middleware/postMiddleware";
import { createPostControll } from "../controllers/post/createPost";

export const routerPost: Router = Router();
routerPost.get('/all', postMiddleware, getPostControll);
routerPost.post('/create', postMiddleware, createPostControll);
