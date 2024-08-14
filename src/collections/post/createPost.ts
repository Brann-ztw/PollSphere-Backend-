import { Collection, ObjectId } from "mongodb";
import { getPostCollection } from "./getPosts";
import { PostModel, Options } from "../../types/PostModel";

export const createPost = async (
  owner: string,
  title: string,
  description: string,
  option: Options[]
): Promise<string> => {
  try {
    const postsCollection: Collection<PostModel> = await getPostCollection();

    if (!owner || !title || !description || !option.length) {
      return 'Missing required fields';
    }

    const newPost: PostModel = {
      _id: new ObjectId(),
      owner,
      title,
      description,
      options: option,
      likes: 0,
      comment: [],
    };

    await postsCollection.insertOne(newPost);
    return 'Post created successfully';
  } catch (error) {
    console.error('Error creating post:', error);
    return 'Error creating post';
  }
};
