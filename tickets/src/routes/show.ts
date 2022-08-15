import { NotFoundError } from '@gunit/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  
  // if(!ticket) {
  //   throw new NotFoundError();
  // }
  if (!ticket) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send(ticket);
});

export { router as showTicketRouter };
