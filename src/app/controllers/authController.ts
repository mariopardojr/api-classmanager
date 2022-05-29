import express, { Express } from 'express';
import { HttpStatusCode } from '../enums/http-status-code';
import UserService from '../services/UserService/UserService';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await UserService.register(req.body);

    if (user.status !== HttpStatusCode.CREATED) {
      return res.status(user.status).send(user);
    }

    return res.status(user.status).send(user);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Registration failed.', error });
  }
});

router.post('/authenticate', async (req, res) => {
  try {
    const user = await UserService.authenticate(req.body);

    if (user.status !== HttpStatusCode.SUCCESS) {
      return res.status(user.status).send(user);
    }

    return res.status(user.status).send(user);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Authentication failed.', error });
  }
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserService.forgotPassword(email);
    console.log(user);

    return res.send(user);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Authenticate failed.', error });
  }
});

router.post('/reset_password', async (req, res) => {
  try {
    const user = await UserService.resetPassword(req.body);

    if (user) {
      return res.status(user.status).send(user);
    }

    return res.send();
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Reset password failed.', error });
  }
});

export const authController = (app: Express) => app.use('/auth', router);
