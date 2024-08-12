import { Router } from "express";
import { registerControll } from "../controllers/auth/registerControll";

export const routerAuth: Router = Router();
routerAuth.post('/register', registerControll);
