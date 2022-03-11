import { HttpStatusCode } from '../../enums/http-status-code';

export interface NoteRegister {
  title: string;
  note: string;
  studentId: string;
}

export interface NoteUpdate {
  _id: string;
  note: string;
  title: string;
}

type Note = {
  _id: string;
  title: string;
  note: string;
  studentId: string;
};

export interface NoteResponse {
  status: HttpStatusCode;
  notes: Note[];
}
