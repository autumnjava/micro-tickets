import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log('this is a custom error, we shall get here yo');
    
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err, 'normal error');
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
