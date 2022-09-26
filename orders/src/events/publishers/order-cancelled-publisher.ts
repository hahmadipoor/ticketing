import { Subjects, Publisher, OrderCancelledEvent } from '@sgblits/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

