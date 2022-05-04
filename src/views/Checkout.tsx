import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useCartContext, CartContent } from '../context/cartContext';

// stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { CheckoutForm } from '../components/index';

const stripePromise = loadStripe(
  'pk_test_51Ku48qG0Nbgy3fuoUxyKlphp9zRiLPaRXRlTIt8tWfOwISDBrOHQU0pIb8HZ7WxGHQUM6CAPZ0E7diHjyg9sO4zx00nIIYoZuC'
);

type Props = {};

const Checkout: React.FC = (props: Props) => {
  const { total_amount, has_discount, total_with_discount, discount, cart } =
    useCartContext();
  // stripe
  const [clientSecret, setClientSecret] = useState('');
  const cart_checkout = cart.map((item) => {
    return {
      id: item.id,
      price: +item.price,
      amount: item.amount,
      name: item.name,
    };
  });

  const createPaymentIntent = async () => {
    try {
      await fetch(
        'https://noodles-api.herokuapp.com/api/users/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cart_checkout, discount: discount }),
        }
      )
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .then(() => console.log(clientSecret));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cart.length) createPaymentIntent();
  }, []);

  return (
    <Wrapper className='page-100'>
      {cart.map((item: CartContent) => {
        const { name, price, amount, id } = item;
        return (
          <div key={id}>
            name:{name}
            <br />
            amount:{amount}
            <br />
            price:{price}
            <br />
            subTotal : {+item.price * item.amount}
            <br />
          </div>
        );
      })}
      <h2>Checkout</h2>
      <p>total:{total_amount}</p>
      <p>with discount:{total_with_discount}</p>
      4242 4242 4242 4242
      <div>
        {clientSecret && (
          <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
    background: white;
  }

  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }

  #payment-element {
    margin-bottom: 24px;
  }

  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
`;
export default Checkout;
