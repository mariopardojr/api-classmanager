import { HttpStatusCode } from '../../enums/http-status-code';

type Student = {
  id: string;
  name: string;
  imageUrl: string;
};

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  students: Student[] | undefined;
}

export interface AuthenticateUser {
  status: HttpStatusCode;
  user: User;
  token: string;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
  token: string;
  password: string;
}
