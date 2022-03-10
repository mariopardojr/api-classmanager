import { HttpStatusCode } from '../../enums/http-status-code';

export type StudentData = {
  name: string;
  age: string;
  job: string;
  grade: string;
  englishLevel: string;
  teacherId: string;
};

export interface Student {
  status: HttpStatusCode;
  student: StudentData;
}
