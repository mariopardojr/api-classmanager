import express, { Express } from 'express';
import { User } from '../models/User';
import { passwordVerification } from '../utils/passwordVerification';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.send(409).send({ message: 'User already exists.' });
    }

    const user = await User.create(req.body);
    user.password = undefined;

    return res.send({ user });
  } catch (error) {
    return res.status(400).send({ message: 'Registration failed.', error });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

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

export const authRouter = (app: Express) => app.use('/auth', router);
