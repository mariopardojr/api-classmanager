import express, { Express } from 'express';
import { HttpStatusCode } from '../enums/http-status-code';
import StudentService from '../services/StudentService/StudentService';

const router = express.Router();

router.get('/students/:id', async (req, res) => {
  try {
    const students = await StudentService.getAllStudentsByTeacherId(req.params.id);

    return res.status(students.status).send(students);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Error to get students.', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await StudentService.getStudent(req.params.id);

    return res.status(user.status).send(user);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Search for a student failed.', error });
  }
});

router.post('/register', async (req, res) => {
  try {
    const student = await StudentService.studentRegister(req.body);

    return res.status(student.status).send(student);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: 'Error to register student.', error });
  }
});

export const studentController = (app: Express) => app.use('/student', router);
