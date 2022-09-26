import { Publisher, Subjects, TicketUpdatedEvent } from '@sgblits/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
