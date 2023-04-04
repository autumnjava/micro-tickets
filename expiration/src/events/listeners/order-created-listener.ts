import { Listener, OrderCreatedEvent, Subjects } from '@gunit/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    await expirationQueue.add(
        {
          orderId: data.id,
        },
        {
          delay: 10000,
        }
      );

    msg.ack();
  }
}
