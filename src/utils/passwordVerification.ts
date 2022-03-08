import bcrypt from 'bcryptjs';

export const passwordVerification = async (requestPassword: string, userPassword: string): Promise<boolean> => {
  return bcrypt.compare(requestPassword, userPassword);
};
