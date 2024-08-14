import { Request, Response } from "express";
import { validateRequestBody } from "../../validators/validateRequestBody";
import { WithId } from "mongodb";
import { generateToken } from "../../utils/generateToken";
import { UserModel, UserLogin } from "../../types/UsersModel";
import { getUserByEmail } from "../../collections/auth/getUsers";
import bcrypt from 'bcrypt';

export const loginControll = async(req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as UserLogin;

    if (!validateRequestBody<UserLogin>(req.body, ['email', 'password'])) {
      return res.status(400).json({ success: false, message: 'A parameter is undefined' });
    }

    const validEmail: RegExp = /^[\w\DÑñ]+([.-_+]?\w+)*@[a-zA-Z\d-]+(\.[a-zA-Z]{2,10})+$/;
    if (!validEmail.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (password.length < 8 || password.length > 30) {
      return res.status(400).json({ success: false, message: 'Password must be between 8 and 30 characters long' });
    }

    const userExistent: WithId<UserModel> | null = await getUserByEmail(email);
    if (!userExistent) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, userExistent.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const token: string = generateToken(userExistent._id);
    return res.status(200).json({ success: true, message: 'User logged in successfully', token: token });
    
  } catch (error) {
    console.error('Error in login controller:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
