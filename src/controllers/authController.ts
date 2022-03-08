import express, { Express } from 'express';
import { User } from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.send(409).send({ message: 'User already exists' });
    }

    const user = await User.create(req.body);
    user.password = undefined;

    return res.send({ user });
  } catch (error) {
    return res.status(400).send({ message: 'Registration failed', error });
  }
});

export const authRouter = (app: Express) => app.use('/auth', router);
