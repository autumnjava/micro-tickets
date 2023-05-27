import { PaymentCreatedEvent, Publisher, Subjects } from '@gunit/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
