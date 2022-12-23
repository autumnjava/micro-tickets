import { NotAuthorizedError, NotFoundError, requireAuth } from '@gunit/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate('ticket');

  if(!order) {
    // throw new NotFoundError();
    res.sendStatus(404);
    return;
  }

  if(order.userId !== req.currentUser!.id) {
    // throw new NotAuthorizedError();
    res.sendStatus(401);
    return;
  }

  res.send(order);
});

export { router as showOrderRouter };
