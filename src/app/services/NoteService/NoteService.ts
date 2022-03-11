import { HttpStatusCode } from '../../enums/http-status-code';
import { NoteModel } from '../../models/NoteModel';
import { ResultError } from '../interfaces';
import { NoteRegister, NoteResponse, NoteUpdate } from './types';

const createNote = async (noteRegister: NoteRegister) => {
  const note = await NoteModel.create(noteRegister);

  return { status: HttpStatusCode.CREATED, note };
};

const getAllNotesByStudentId = async (studentId: string): Promise<NoteResponse | ResultError> => {
  const notes = await NoteModel.find({ studentId });

  if (!notes) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Student not found.' };
  }

  return { status: HttpStatusCode.SUCCESS, notes };
};

const updateNote = async (noteUpdate: NoteUpdate): Promise<void | ResultError> => {
  const note = await NoteModel.findById(noteUpdate._id);

  if (!note) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Note not found.' };
  }

  note.title = noteUpdate.title;
  note.note = noteUpdate.note;

  note.save();
};

const deleteNote = async (id: string): Promise<ResultError | void> => {
  const note = await NoteModel.findById(id);

  if (!note) {
    return { status: HttpStatusCode.NOT_FOUND, message: 'Note not found.' };
  }

  note.remove();
};

const NoteService = {
  createNote,
  updateNote,
  deleteNote,
  getAllNotesByStudentId,
};

export default NoteService;
