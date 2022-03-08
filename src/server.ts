import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { authController } from './controllers/authController';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

authController(app);

app.listen(3000, () => console.log('Listen 3000 port.'));
