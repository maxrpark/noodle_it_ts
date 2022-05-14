import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';

// stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import {
  CheckoutForm,
  PageTitle,
  OrderDetailsComponent,
} from '../components/index';

const REACT_APP_STRIPE_KEY: string =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!;

const stripePromise = loadStripe(REACT_APP_STRIPE_KEY);

const Checkout: React.FC = () => {
  const { total_amount, total_with_discount, discount, cart } =
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
    <Wrapper>
      <PageTitle title={'Checkout'} image={''} />
      <div className='section-center page-100'>
        <OrderDetailsComponent
          cart={cart}
          total_amount={total_amount}
          total_with_discount={total_with_discount}
          discount={discount}
        />
        <div>
          <div className='payment-info-container'>
            {clientSecret && (
              <Elements stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .section-center {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 1200px;
    /* position: relative; */
    position: relative;

    @media screen and (min-width: 1100px) {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2rem;
    }
  }
  .payment-info-container {
    padding: 0 0.5rem;
    max-width: 430px;
    margin: 0 auto;
  }
  @media screen and (min-width: 960px) {
    .payment-info-container {
      position: sticky;
      top: 0;
    }
  }
  .test-card {
    text-transform: capitalize;
    color: var(--special-color-1);
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;
export default Checkout;
