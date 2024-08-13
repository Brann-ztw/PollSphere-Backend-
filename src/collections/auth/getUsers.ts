import { Collection, Db, ObjectId, WithId } from "mongodb";
import { getDb } from "../../config/database";
import { UserModel } from "../../types/UsersModel";

export const getUsers = ():Collection<UserModel> => {
  const db: Db = getDb();
  return db.collection<UserModel>('Users');
};

const getUser = async (query: Partial<UserModel>): Promise<WithId<UserModel> | null> => {
  const userCollection: Collection<UserModel> = await getUsers();
  return userCollection.findOne(query);
};

export const getUserByEmail = (email: string) => getUser({ email });
export const getUserById = (_id: ObjectId) => getUser({ _id });

