import * as bcrypt from 'bcrypt';

export const hashPassword = async (
  password: string,
  saltRounds: number = 10,
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const isValidPassword = async (
  passwordFromRequest: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(passwordFromRequest, hashedPassword);
};