import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from '@gunit/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('order not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    // technically we should notify other services that order has been updated,
    // but i am not going to do that as after order is paid, we are not going to do
    // anything else with it in the future.

    msg.ack();
  }
}
