import { Publisher, Subjects, TicketCreatedEvent } from '@sgblits/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

