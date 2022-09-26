import { Publisher, OrderCreatedEvent, Subjects } from '@sgblits/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
