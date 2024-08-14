import { ObjectId } from "mongodb";

export interface Comment {
  owner: string,
  likes: number,
  comment: string
}

export interface Options {
  option: string,
  likes: number
}

export interface Post {
  owner: string,
  title: string,
  description: string,
  options: Options[],
}

export interface PostModel  extends Post{
  _id: ObjectId
  likes: number,
  comment: Comment[]
}