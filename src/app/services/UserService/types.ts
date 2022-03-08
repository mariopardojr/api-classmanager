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
  user: User;
  token: string;
}

export interface UserAuth {
  email: string;
  password: string;
}
