import { Collection, Db, ObjectId, WithId } from "mongodb";
import { getDb } from "../../config/database";
import { UserModel } from "../../types/UsersModel";
import { PostModel } from "../../types/PostModel";

export const getPost = ():Collection<PostModel> => {
  const db: Db = getDb();
  return db.collection<PostModel>('Post');
};

export const getPosts = async (): Promise<WithId<PostModel> | null> => {
  const userCollection: Collection<PostModel> = await getPost();
  return userCollection.findOne();
};


