import { OrderStatus, requireAuth, validateRequest } from '@gunit/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payment';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      //   throw new Error('Order not found');
      res.sendStatus(404);
      return;
    }

    if (order.userId !== req.currentUser!.id) {
      //   throw new Error('Not authorized!');
      res.sendStatus(401);
      return;
    }

    if (order.status === OrderStatus.Cancelled) {
      //   throw new Error('Order is cancelled');
      res.sendStatus(400);
      return;
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });

    await payment.save();
    
    res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
