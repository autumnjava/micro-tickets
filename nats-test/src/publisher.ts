import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();

// stan = client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('successfully connected to nats');

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      title: 'habibi',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }

  // const data = {
  //   id: '123',
  //   title: 'justin bieber',
  //   price: 20,
  // };

  // stan.publish('ticket:created', JSON.stringify(data), () => {
  //   console.log('event published');
  // });
});