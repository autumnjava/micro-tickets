import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('changes specific order status to cancelled', async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  
  const user = global.signin();

  // make a request to build an order with this ticket
  const { body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to cancel the order
  const {body: fetchedOrder} = await request(app)
  .delete(`/api/orders/${order.id}`)
  .set('Cookie', user)
  .send()
  .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo('emits an order cancelled event');
