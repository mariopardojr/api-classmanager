type Student = {
  id: string;
  name: string;
  imageUrl: string;
};

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  students: Student[] | undefined;
}
