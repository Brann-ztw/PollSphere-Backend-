import { UserBody } from "../types/controllers/auth/Register";

export const validateRequestBody = (body: UserBody, requiredFields: (keyof UserBody)[]): boolean => {
  for (const field of requiredFields) {
    if (body[field] === undefined || body[field] === '') return false;
  }
  return true;
}