import { Router } from "express";
import { registerControll } from "../controllers/auth/registerControll";
import { loginControll } from "../controllers/auth/loginControll";

export const routerAuth: Router = Router();
routerAuth.post('/register', registerControll);
routerAuth.post('/login', loginControll);
