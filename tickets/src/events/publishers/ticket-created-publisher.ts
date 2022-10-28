import { Publisher, Subjects, TicketCreatedEvent } from '@gunit/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    // readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    readonly subject = Subjects.TicketCreated;
}
