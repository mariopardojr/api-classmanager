import { UserModel } from '../../models/UserModel';
import { generateToken } from '../../../utils/generateToken';
import { passwordVerification } from '../../../utils/passwordVerification';
import { AuthenticateUser, ResetPasswordParams, ResultError, User, UserAuth } from './types';
import { transport } from '../../modules/mailer';
import crypto from 'crypto';
import 'dotenv/config';
import { HttpStatusCode } from '../../enums/http-status-code';

const register = async (user: User): Promise<AuthenticateUser | ResultError> => {
  const { email } = user;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return { status: HttpStatusCode.CONFLICT, message: 'User already exists.' };
  }

  const register = await UserModel.create(user);
  register.password = undefined;

  return { status: HttpStatusCode.CREATED, user: register, token: generateToken(register.id) };
};

const authenticate = async ({ email, password }: UserAuth): Promise<AuthenticateUser | ResultError> => {
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'User not found.' };
  }

  const comparePassword = await passwordVerification(password, user.password);
  if (!comparePassword) {
    return { status: HttpStatusCode.FORBIDDEN, message: 'Invalid email or password.' };
  }

  user.password = undefined;
  return { status: HttpStatusCode.SUCCESS, user, token: generateToken({ id: user.id }) };
};

const forgotPassword = async (email: string): Promise<void | ResultError> => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'User not found.' };
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

  transport.sendMail(
    {
      from: process.env.USER,
      to: email,
      subject: 'Password reset',
      text: `Hello, ${user.name}! Use the following code to reset passsword in ClassManager. Code: ${token}`,
    },
    (error) => {
      if (error) {
        return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Cannot send token to reset password.' };
      }
    }
  );
};

const resetPassword = async (resetPassword: ResetPasswordParams): Promise<void | ResultError> => {
  const { email, token, password } = resetPassword;

  const user = await UserModel.findOne({ email }).select('+passwordResetToken passwordResetExpires');

  if (!user) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'User not found.' };
  }

  if (token !== user.passwordResetToken) {
    return { status: HttpStatusCode.UNAUTHORIZED, message: 'Invalid token.' };
  }

  const now = new Date();

  if (now > user.passwordResetExpires) {
    return { status: HttpStatusCode.UNAUTHORIZED, message: 'Token expired. Generate a new one.' };
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
