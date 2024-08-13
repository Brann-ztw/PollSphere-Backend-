import { ObjectId } from "mongodb";

interface Comment {
  owner: string,
  likes: number,
  comment: string
}

export interface Post {
  owner: string,
  title: string,
  description: string,
  options: string[],
  likes: number,
  comment: Comment[]
}

export interface PostModel {
  _id: ObjectId
}