import { NextFunction ,Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../config/config";
import { ObjectId, WithId } from "mongodb";
import { getUserById } from "../collections/auth/getUsers";
import { UserModel } from "../types/UsersModel";
import { JwtPayload } from "../types/JwtPayload";

export const authMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const authHeader: string | undefined = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')) {
      const token: string = authHeader.split(' ')[1];
      const decode = jwt.verify(token, config.jwt_secret) as JwtPayload;
      const user: UserModel | null = await getUserById(new ObjectId(decode.id));

      if (user) {
        return res.status(200).redirect('/');
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log('Error middlware(auth): ', error);
    return res.status(401).json({message: 'Not authorized, token faild'});
  }
};


