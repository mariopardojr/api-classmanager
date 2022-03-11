import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { authController } from './app/controllers/authController';
import { studentController } from './app/controllers/studentController';
import { noteController } from './app/controllers/noteController';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

authController(app);
studentController(app);
noteController(app);

app.listen(3000, () => console.log('Listen 3000 port.'));
