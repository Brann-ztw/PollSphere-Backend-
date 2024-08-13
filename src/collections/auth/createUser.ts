import { Collection, ObjectId } from "mongodb";
import { getUsers } from "./getUsers";
import { UserModel } from "../../types/UsersModel";

export const createUser = async(
  _id: ObjectId,
  name: string,
  dirname: string,
  age: number,
  email: string,
  password: string,
  phoneNumber: string
): Promise<string> => {
  try {
    const users: Collection<UserModel> = getUsers();
    await users.insertOne({
      _id: _id,
      name: name,
      dirname: dirname,
      age: age,
      email: email,
      password: password,
      phoneNumber: phoneNumber
    });
    return 'User created successfully';
  } catch (error) {
    console.log('Error create User:', error);
    return 'Error create User';
  }
};