import { Request, Response } from "express";
import { validateRequestBody } from "../../validators/validateRequestBody";
import { WithId } from "mongodb";
import { generateToken } from "../../utils/generateToken";
import { UserModel, UserLogin } from "../../types/UsersModel";
import { getUserByEmail } from "../../collections/auth/getUsers";
import bcrypt from 'bcrypt';

export const loginControll = async(req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserLogin;

    if(!validateRequestBody<UserLogin>(req.body, ['email', 'password'])) {
      return res.status(404).json({succes: false, message: 'A parameter is undefined'});
    }

    const validEmail: RegExp = /^[\w\DÑñ]+([.-_+]?\w+)*@[a-zA-Z\d-]+(\.[a-zA-Z]{2,10})+$/;
    if(!validEmail.test(email)) {
      return res.status(404).json({succes: false, message: 'Invalid email format'});
    }

    if(password.length <= 8) {
      return res.status(404).json({succes: false, message: 'Password too short, must be at least 8 characters long'});
    }
    if(password.length >= 30) {
      return res.status(404).json({succes: false, message: 'Password too large, must be at least 8 characters long'});
    }

    const userExistent: WithId<UserModel> | null = await getUserByEmail(email);
    if(!userExistent) {
      return res.status(400).json({succes: false, message: 'Invalid credentials'});
    }

    const token: string = generateToken(userExistent._id);
    const isPasswordValid: boolean = await bcrypt.compare(password, userExistent.password);

    if(!isPasswordValid) {
      return res.status(400).json({succes: false, message: 'Invalid password'});
    }

    return res.status(201).json({sucess: true, message: 'Logged in user',token: token});
  } catch (error) {
    console.log('Error in controller register: ', error);
    return res.status(500).json({succes: false, message: 'Internal server error'});
  }
};