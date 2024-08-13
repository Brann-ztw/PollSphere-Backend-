import { ObjectId } from "mongodb";

export interface UserRegister {
  name: string,
  dirname: string,
  age: number,
  email: string,
  password: string,
  phoneNumber: string
}

export interface UserModel extends UserRegister {
  _id: ObjectId
}

export interface UserLogin {
  email: string,
  password: string
}