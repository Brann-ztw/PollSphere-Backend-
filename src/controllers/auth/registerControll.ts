import e, { Request, Response } from "express";
import { UserBody } from "../../types/controllers/auth/Register";
import { validateRequestBody } from "../../validators/validateRequestBody";
import { ObjectId } from "mongodb";
import { createUser } from "../../collections/auth/createUser";
import { generateToken } from "../../utils/generateToken";


export const registerControll = async(req: Request, res: Response) => {
  try {
    const { name, dirname, age, email, password, phoneNumber} = req.body as UserBody;

    if(!validateRequestBody(req.body, ['name', 'dirname', 'age', 'email', 'password', 'phoneNumber'])) {
      return res.status(404).json({succes: false, message: 'A parameter is undefined'});
    }

    if(age < 13 ) {
      return res.status(404).json({succes: false, message: 'The user is not of the allowed age'});
    }
    if(age >= 99) {
      return res.status(404).json({succes: false, message: 'Invalid age'});
    }

    const validEmail: RegExp = /^[\w\DÑñ]+([.-_+]?\w+)*@[a-zA-Z\d-]+(\.[a-zA-Z]{2,10})+$/;
    if(!validEmail.test(email)) {
      return res.status(404).json({succes: false, message: 'Invalid email format'});
    }

    if(password.length <= 8) {
      return res.status(404).json({succes: false, message: 'Password too short, must be at least 8 characters long'});
    }
    if(password.length >= 30) {
      return res.status(404).json({succes: false, message: 'Password too large, must be at least 8 characters long'});
    }

    const alphanumeric: RegExp = /^[\w\D-]+$/;
    if(!alphanumeric.test(password)) {
      return res.status(404).json({succes: false, message: 'Insecure password, must include numbers, letters and special characters'});
    }

    const validPhoneNumber: RegExp = /^\d{10,}$/;
    if (!validPhoneNumber.test(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number, must be at least 10 digits and contain only numbers' });
    }

    const _id: ObjectId = new ObjectId();
    const createNewUser = await createUser(_id, name, dirname, age, email, password, phoneNumber);
    if(createNewUser === 'Error create User') {
      return res.status(500).json({succes: false, message: 'Error create User'});
    }

    const token: string = generateToken(_id);
    return res.status(201).json({sucess: true, message: 'Registered user',token: token});
  } catch (error) {
    console.log('Error in controller register: ', error);
    return res.status(500).json({succes: false, message: 'Internal server error'});
  }
};