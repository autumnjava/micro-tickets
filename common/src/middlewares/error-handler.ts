import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(err.statusCode, 'custom error status code');
    return res.status(err.statusCode).send('I am custom error');
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
