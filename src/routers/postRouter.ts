import { Router } from "express";
import { getPostControll } from "../controllers/post/getPost";
import { postMiddleware } from "../middleware/postMiddleware";

export const routerPost: Router = Router();
routerPost.get('/all', postMiddleware, getPostControll);
