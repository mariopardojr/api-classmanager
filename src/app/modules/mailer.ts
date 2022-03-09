import * as nodemailer from 'nodemailer';
import 'dotenv/config';

export const transport = nodemailer.createTransport({
  host: process.env.HOST,
  port: Number(process.env.PORT_MAILER),
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
