import express, { Express } from 'express';
import { HttpStatusCode } from '../enums/http-status-code';
import LessonService from '../services/LessonService/LessonService';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const lessons = await LessonService.getAllLessons(req.params.id);

    return res.status(lessons.status).send(lessons);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Failed to create lesson.', error });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const lesson = await LessonService.updateLesson(req.body);
    if (lesson?.status !== HttpStatusCode.SUCCESS) {
      return res.status(HttpStatusCode.NOT_FOUND).send(lesson);
    }

    return res.send();
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Failed to update lesson.', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const lesson = await LessonService.deleteLesson(req.params.id);
    if (lesson?.status !== HttpStatusCode.SUCCESS) {
      return res.status(HttpStatusCode.NOT_FOUND).send(lesson);
    }

    return res.send();
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Failed to delete lesson.', error });
  }
});

router.post('/create', async (req, res) => {
  try {
    const note = await LessonService.createLesson(req.body);

    return res.status(note.status).send(note);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Failed to create lesson.', error });
  }
});

export const noteController = (app: Express) => app.use('/lessons', router);