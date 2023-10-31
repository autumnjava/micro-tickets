import { OrderStatus, requireAuth, validateRequest } from '@gunit/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.get('/api/payments/status', async (req: Request, res: Response) => {
  res.status(201).send({ success: true });
});

export { router as createStatusRouter };
