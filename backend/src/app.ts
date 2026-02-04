import 'dotenv/config';

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

const corsOptions = {
  origin: 'https://student.nomorepartiessbs.ru',
  credentials: true,
  optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions));  

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/crash-test', (_req, _res) => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
