import express, { Request, Response } from 'express';
import { OrderStatus, requireAuth, validateRequest } from '@gunit/common';
import { body } from 'express-validator';
import { Order } from '../models/order';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

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

    order.status = OrderStatus.Cancelled;
    await order.save();

    // publish an event saying this was cancelled

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
