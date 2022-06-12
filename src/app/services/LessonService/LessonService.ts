import { HttpStatusCode } from '../../enums/http-status-code';
import { LessonModel } from '../../models/LessonModel';
import { ResultError } from '../interfaces';
import { LessonRegister, LessonUpdate } from './types';

const createLesson = async (lessonRegister: LessonRegister) => {
  const lesson = await LessonModel.create(lessonRegister)

  return { status: HttpStatusCode.CREATED, lesson }
}

const getAllLessons = async (studentId: string) => {
  const lessons = await LessonModel.find({ studentId });

  if (!lessons) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Student not found.' };
  }

  return { status: HttpStatusCode.SUCCESS, lessons };
}

const updateLesson = async (lessonUpdate: LessonUpdate) => {
  const lesson = await LessonModel.findById(lessonUpdate._id)

  if (!lesson) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Lesson not found.' };
  }

  lesson.title = lessonUpdate.title
  lesson.date = lessonUpdate.date
  lesson.startAt = lessonUpdate.startAt,
  lesson.endAt = lessonUpdate.endAt
  lesson.taught = lessonUpdate.taught

  lesson.save()
}

const deleteLesson = async (id: string): Promise<ResultError | void> => {
  const lesson = await LessonModel.findById(id);

  if (!lesson) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Lesson not found.' };
  }

  lesson.remove();
};

const LessonService = {
  createLesson,
  getAllLessons,
  updateLesson,
  deleteLesson
}

export default LessonService