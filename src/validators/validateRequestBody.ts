


export const validateRequestBody = <Type>(body: Type, requiredFields: (keyof Type)[]): boolean => {
  for (const field of requiredFields) {
    if (body[field] === undefined || body[field] === '') return false;
  }
  return true;
}
