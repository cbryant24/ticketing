import { Publisher, OrderCancelledEvent, Subjects } from '@cbtickets24/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
