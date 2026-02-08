import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';

import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import routes from './routes';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'https://student.nomorepartiessbs.ru',
  'http://localhost:3000',
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked'));
    }
  },
  credentials: true,
}));


app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
