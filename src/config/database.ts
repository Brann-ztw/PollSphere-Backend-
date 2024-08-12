import { MongoClient, Db } from "mongodb";
import { config } from "./config";
const MONGO_URI = config.mongo_uri;
let db: Db;

export const connectDb = async(): Promise<MongoClient> => {
  try {
    const client: MongoClient = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db('PollSphere');
    console.log('MongoDb connect');
    return client;
  } catch (error) {
    throw error;
  }
};

export const getDb = (): Db => {
  if(!db) throw new Error('db is undefined');
  return db;
}