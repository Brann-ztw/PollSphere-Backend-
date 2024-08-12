import { ObjectId } from "mongodb";

export interface UserModel {
  _id: ObjectId,
  name: string,
  dirname: string,
  age: number,
  email: string,
  password: string,
  phoneNumber: string
}