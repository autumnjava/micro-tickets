import express from 'express';
import cookieParser from 'cookie-parser'; // in the tutorial is using cookie-session which does not seem to work correctly.
import { errorHandler, NotFoundError, currentUser } from '@gunit/common';
import { listOrdersRouter } from './routes/list';
import { deleteOrderRouter } from './routes/delete';
import { createOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
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

app.use(listOrdersRouter);
app.use(deleteOrderRouter);
app.use(createOrderRouter);
app.use(showOrderRouter);


app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
