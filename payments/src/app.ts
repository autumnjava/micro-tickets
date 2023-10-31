import { NotFoundError, currentUser, errorHandler } from '@gunit/common';
import cookieParser from 'cookie-parser'; // in the tutorial is using cookie-session which does not seem to work correctly.
import * as dotenv from 'dotenv';
import express from 'express';
import { createChargeRouter } from './routes/new';
import { createStatusRouter } from './routes/status';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', (ip: string) => {
  if (ip === '127.0.0.1') {
    console.log('we get here?');
    return true; // trusted IPs
  } else return false;
});
app.use(currentUser);

app.use(createChargeRouter);
app.use(createStatusRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
