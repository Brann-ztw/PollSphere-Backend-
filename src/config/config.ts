import dotevn from 'dotenv';
import { Config } from '../types/config/Config';
dotevn.config();

// Uncomment in production
// if(process.env.PORT === undefined) throw new Error('The PORT is undefined.');
// if(process.env.MONGO_URI === undefined) throw new Error('The MONGO_URI is undefined.');

export const config: Config = {
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  jwt_secret: process.env.JWT_SECRET || 'secret',
}

