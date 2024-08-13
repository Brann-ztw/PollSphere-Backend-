import { Router } from "express";
import { registerControll } from "../controllers/auth/registerControll";
import { loginControll } from "../controllers/auth/loginControll";
import { authMiddleware } from "../middleware/authMiddelware";

export const routerAuth: Router = Router();
routerAuth.post('/register', authMiddleware, registerControll);
routerAuth.post('/login', authMiddleware, loginControll);

// add authMiddleware for the front