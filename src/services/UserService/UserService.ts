import { Result } from '../../contracts/result/result';
import { ResultConflict } from '../../contracts/result/result-conflict';
import { ResultCreated } from '../../contracts/result/result-created';
import { ResultErrorFactory } from '../../contracts/result/result-error-factory';
import { UserModel } from '../../models/UserModel';
import { User } from './types';

const register = async (user: User): Promise<Result<User>> => {
  const { email } = user;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return new ResultConflict('User already exists.');
  }

  const register = await UserModel.create(user);
  register.password = undefined;

  return new ResultCreated(register);
};

const UserService = {
  register,
};

export default UserService;
