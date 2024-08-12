import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { config } from '../config/config';
const JWT_SECRET: string = config.jwt_secret;

export const generateToken = (_id: ObjectId): string => {
  return jwt.sign({_id}, JWT_SECRET, {
    expiresIn: '1h'
  });
};