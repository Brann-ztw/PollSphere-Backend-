import { Collection, Db, WithId } from "mongodb";
import { getDb } from "../../config/database";
import { PostModel } from "../../types/PostModel";

export const getPostCollection = (): Collection<PostModel> => {
  const db: Db = getDb();
  return db.collection<PostModel>('Posts');
};

export const getAllPosts = async (): Promise<WithId<PostModel>[]> => {
  const postCollection: Collection<PostModel> = getPostCollection();
  return postCollection.find({}).toArray();
};
