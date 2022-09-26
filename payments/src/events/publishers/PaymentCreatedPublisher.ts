import {  Subjects,  Publisher,  PaymentCreatedEvent,} from '@sgblits/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

