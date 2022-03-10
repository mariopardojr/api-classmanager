import { HttpStatusCode } from '../../enums/http-status-code';
import { StudentModel } from '../../models/StudentModel';
import { UserModel } from '../../models/UserModel';
import { ResultError } from '../interfaces';
import { Student, StudentData } from './types';

const getStudent = async (id: string): Promise<Student | ResultError> => {
  const student = await StudentModel.findById(id);

  if (!student) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Student not found.' };
  }

  return { status: HttpStatusCode.SUCCESS, student };
};

const studentRegister = async (student: StudentData): Promise<Student> => {
  const register = await StudentModel.create(student);

  await UserModel.findByIdAndUpdate(student.teacherId, {
    ['$push']: {
      students: {
        id: register.id,
        name: register.name,
        imageUrl: register.imageUrl,
      },
    },
  });

  return { status: HttpStatusCode.CREATED, student: register };
};

const StudentService = {
  getStudent,
  studentRegister,
};

export default StudentService;
