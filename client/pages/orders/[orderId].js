import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => console.log(payment),
  });

  useEffect(() => {
    const expiresAtDate = new Date(order.expiresAt);
    const findTimeLeft = () => {
      const msLeft = expiresAtDate - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) return <div>Order expired</div>;

  return (
    <div>
      <h1>Order by id</h1>
      <p>time left to pay: {timeLeft} seconds</p>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey='pk_test_51NC0OtEVkCY3CmWxALCTaKpKy45i4CraraZn1dCAlmAiUkB7FAcnlTHQB45RTl1VBzK3USAlYoZXYIn6j2LvssCe00I3eR1UF9'
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

// this is coming from _app.js
OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  console.log(data, 'data what we get here?');
  return { order: data };
};

export default OrderShow;
