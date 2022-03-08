import { Result } from '../../../contracts/result/result';
import { ResultConflict } from '../../../contracts/result/result-conflict';
import { ResultCreated } from '../../../contracts/result/result-created';
import { ResultForbidden } from '../../../contracts/result/result-forbidden';
import { ResultNotFound } from '../../../contracts/result/result-not-found';
import { ResultSuccess } from '../../../contracts/result/result-success';
import { UserModel } from '../../models/UserModel';
import { generateToken } from '../../../utils/generateToken';
import { passwordVerification } from '../../../utils/passwordVerification';
import { AuthenticateUser, User, UserAuth } from './types';

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

const UserService = {
  register,
  authenticate,
};

export default UserService;
