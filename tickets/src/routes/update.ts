import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotAuthorizedError,
  NotFoundError,
} from '@gunit/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    // follow up code is failing my tests:
    // if(!ticket) {
    //   throw new NotFoundError();
    // }

    if (!ticket) {
      res.sendStatus(404);
      return;
    }

    if (ticket.userId !== req.currentUser!.id) {
      res.sendStatus(401);
      return;
    }

    ticket.set({ title: req.body.title, price: req.body.price });
    await ticket.save();

    res.status(200).send(ticket);
  }
);

export { router as updateTicketRouter };
