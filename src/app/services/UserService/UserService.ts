import { Result } from '../../../contracts/result/result';
import { ResultConflict } from '../../../contracts/result/result-conflict';
import { ResultCreated } from '../../../contracts/result/result-created';
import { ResultForbidden } from '../../../contracts/result/result-forbidden';
import { ResultNotFound } from '../../../contracts/result/result-not-found';
import { ResultSuccess } from '../../../contracts/result/result-success';
import { UserModel } from '../../models/UserModel';
import { generateToken } from '../../../utils/generateToken';
import { passwordVerification } from '../../../utils/passwordVerification';
import { AuthenticateUser, ResetPasswordParams, User, UserAuth } from './types';
import { transport } from '../../modules/mailer';
import crypto from 'crypto';
import 'dotenv/config';
import { ResultError } from '../../../contracts/result/result-error';

const register = async (user: User): Promise<Result<AuthenticateUser>> => {
  const { email } = user;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return new ResultConflict('User already exists.');
  }

  const register = await UserModel.create(user);
  register.password = undefined;

  return new ResultCreated({ user: register, token: generateToken(register.id) });
};

const authenticate = async ({ email, password }: UserAuth): Promise<Result<AuthenticateUser>> => {
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    return new ResultNotFound('User not found.');
  }

  const comparePassword = await passwordVerification(password, user.password);
  if (!comparePassword) {
    return new ResultForbidden('Invalid email or password.');
  }

  user.password = undefined;
  return new ResultSuccess({ user, token: generateToken({ id: user.id }) });
};

const forgotPassword = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return new ResultNotFound('User not found.');
  }

  const token = crypto.randomBytes(6).toString('hex');

  const now = new Date();
  now.setHours(now.getHours() + 1);

  await UserModel.findByIdAndUpdate(user.id, {
    ['$set']: {
      passwordResetToken: token,
      passwordResetExpires: now,
    },
  });

  // transport.sendMail(
  //   {
  //     from: process.env.USER,
  //     to: email,
  //     subject: 'Password reset',
  //     text: `Hello, ${user.name}! Use the following code to reset passsword in ClassManager. Code: ${token}`,
  //   },
  //   (error) => {
  //     if (error) {
  //       return new ResultError('Cannot send token to reset password.');
  //     }
  //   }
  // );
};

const resetPassword = async (resetPassword: ResetPasswordParams) => {
  const { email, token, password } = resetPassword;

  const user = await UserModel.findOne({ email }).select('+passwordResetToken passwordResetExpires');

  if (!user) {
    return new ResultNotFound('User not found.');
  }

  if (token !== user.passwordResetToken) {
    return new ResultForbidden('Invalid token.');
  }

  const now = new Date();

  if (now > user.passwordResetExpires) {
    return new ResultForbidden('Token expired. Generate a new one.');
  }

  user.password = password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  user.save();
};

const UserService = {
  register,
  authenticate,
  forgotPassword,
  resetPassword,
};

export default UserService;
