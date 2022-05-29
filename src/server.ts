import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { authController } from './app/controllers/authController';
import { studentController } from './app/controllers/studentController';
import { noteController } from './app/controllers/noteController';

const PORT = process.env.PORT || 3000
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

authController(app);
studentController(app);
noteController(app);

app.listen(PORT, () => console.log(`Listen ${PORT} port.`));
