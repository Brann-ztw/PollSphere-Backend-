import { Collection, Db } from "mongodb";
import { getDb } from "../../config/database";
import { UserModel } from "../../types/collections/auth/Users";

export const getUsers = ():Collection<UserModel> => {
  const db: Db = getDb();
  return db.collection<UserModel>('Users');
};