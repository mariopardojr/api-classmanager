import { HttpStatusCode } from '../../enums/http-status-code';
import { StudentModel } from '../../models/StudentModel';
import { ResultError } from '../interfaces';
import { Student, StudentData } from './types';

const getStudent = async (id: string): Promise<Student | ResultError> => {
  const student = await StudentModel.findById(id);

  if (!student) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Student not found.' };
  }

  return { status: HttpStatusCode.SUCCESS, student };
};

const getAllStudentsByTeacherId = async (teacherId: string) => {
  const students = await StudentModel.find({ teacherId }, { name: 1, imageUrl: 1, _id: 1 });

  if (!students) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Teacher not found.' };
  }

  return { status: HttpStatusCode.SUCCESS, students };
};

const studentRegister = async (student: StudentData): Promise<Student> => {
  const register = await StudentModel.create(student);

  return { status: HttpStatusCode.CREATED, student: register };
};

const StudentService = {
  getStudent,
  studentRegister,
  getAllStudentsByTeacherId,
};

export default StudentService;
