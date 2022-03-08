import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (params: { id: string }): string => {
  const jwtConfig = {
    expiresIn: 604800,
  };

  const secret = String(process.env.JWT_SECRET);
  const token = jwt.sign({ id: params.id }, secret, jwtConfig);
  return token;
};
