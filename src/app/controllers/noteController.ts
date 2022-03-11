import express, { Express } from 'express';
import { HttpStatusCode } from '../enums/http-status-code';
import NoteService from '../services/NoteService/NoteService';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const notes = await NoteService.getAllNotesByStudentId(req.params.id);

    return res.status(notes.status).send(notes);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Failed to create note.', error });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const note = await NoteService.updateNote(req.body);
    if (note?.status !== HttpStatusCode.SUCCESS) {
      return res.status(HttpStatusCode.NOT_FOUND).send(note);
    }

    return res.send();
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Failed to create note.', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const note = await NoteService.deleteNote(req.params.id);
    if (note?.status !== HttpStatusCode.SUCCESS) {
      return res.status(HttpStatusCode.NOT_FOUND).send(note);
    }

    return res.send();
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Failed to create note.', error });
  }
});

router.post('/create', async (req, res) => {
  try {
    const note = await NoteService.createNote(req.body);

    return res.status(note.status).send(note);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Failed to create note.', error });
  }
});

export const noteController = (app: Express) => app.use('/note', router);
