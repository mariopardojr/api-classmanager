import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import 'dotenv/config';
import { UserModel } from '../models/UserModel';
import { HttpStatusCode } from '../enums/http-status-code';

const secret = String(process.env.JWT_SECRET);

export const jwtAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'Missing auth token.' });
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: string };
    const user = await UserModel.findOne({ id: decoded.id });

    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'User not found.' });
    }

    // @ts-ignore
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'JWT malformed.' });
  }
};
