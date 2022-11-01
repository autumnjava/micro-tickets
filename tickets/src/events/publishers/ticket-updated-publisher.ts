import { Publisher, Subjects, TicketUpdatedEvent } from '@gunit/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    // readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    readonly subject = Subjects.TicketUpdated;
}
