import { HttpStatusCode } from '../../enums/http-status-code';

type Student = {
  id: string;
  name: string;
  imageUrl: string;
};

export interface UserData {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  students: Student[] | undefined;
}

export interface User {
  status: HttpStatusCode;
  user: UserData;
}

export interface AuthenticateUser extends User {
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
