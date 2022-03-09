import express, { Express } from 'express';
import { HttpStatusCode } from '../../contracts/result/http-status-code';
import UserService from '../services/UserService/UserService';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const findUser = await UserService.register(req.body);

    if (findUser.isError) {
      return res.status(findUser.status).send({ message: findUser.errorMessage });
    }

    return res.status(findUser.status).send(findUser.data);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Registration failed.', error });
  }
});

router.post('/authenticate', async (req, res) => {
  try {
    const user = await UserService.authenticate(req.body);

    if (user.isError) {
      return res.status(user.status).send(user);
    }

    return res.status(user.status).send(user);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Authenticate failed.', error });
  }
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserService.forgotPassword(email);

    if (user?.isError) {
      return res.status(user.status).send({ message: user.errorMessage });
    }
    return res.send(user);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Authenticate failed.', error });
  }
});

export const authController = (app: Express) => app.use('/auth', router);
