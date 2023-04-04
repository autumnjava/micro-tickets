import { OrderCancelledEvent, Publisher, Subjects } from '@gunit/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
