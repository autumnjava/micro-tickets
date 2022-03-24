import express from 'express';
import 'express-async-errors';

import cookieSession from 'cookie-session';

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(express.json());
app.set('trust-proxy', true);
app.use(
    cookieSession({
        signed: false,  // disable encription on the cookie
        secure: process.env.NODE_ENV !== 'test' // jest is not using HTTPS to send requests
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);


export { app };