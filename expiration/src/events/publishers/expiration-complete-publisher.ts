import { ExpirationCompleteEvent, Publisher, Subjects } from '@gunit/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
