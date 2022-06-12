export interface LessonRegister {
  title: string;
  date: string;
  studentId: string;
  endAt: string;
  startAt: string;
  taught: boolean;
}

export interface LessonUpdate extends LessonRegister {
  _id: string
}