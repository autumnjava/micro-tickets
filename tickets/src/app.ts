import express from 'express';
import cookieParser from 'cookie-parser'; // in the tutorial is using cookie-session which does not seem to work correctly.
import { errorHandler, NotFoundError, currentUser } from '@gunit/common';

// routes
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { showTicketsRouter } from './routes/list';


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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(showTicketsRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
