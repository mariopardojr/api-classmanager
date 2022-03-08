import express, { Express } from 'express';
import { UserModel } from '../models/UserModel';
import UserService from '../services/UserService/UserService';
import { passwordVerification } from '../utils/passwordVerification';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const findUser = await UserService.register(req.body);

    if (findUser.isError) {
      return res.status(findUser.status).send({ message: findUser.errorMessage });
    }

    return res.status(findUser.status).send({ user: findUser.data });
  } catch (error) {
    return res.status(500).send({ message: 'Registration failed.', error });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(404).send({ message: 'User not found.' });
  }

  const isSamePassword = await passwordVerification(password, user.password);

  if (!isSamePassword) {
    return res.status(403).send({ message: 'Invalid email or password.' });
  }

  user.password = undefined;

  return res.send({ user });
});

export const authController = (app: Express) => app.use('/auth', router);
