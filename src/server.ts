import express from 'express';
import cors from 'cors';
import { authController } from './app/controllers/authController';
import { studentController } from './app/controllers/studentController';
import { noteController } from './app/controllers/noteController';
import { lessonController } from './app/controllers/lessonController';
import 'dotenv/config';

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

authController(app);
studentController(app);
noteController(app);
lessonController(app)

app.listen(PORT, () => console.log(`Listen ${PORT} port.`));
