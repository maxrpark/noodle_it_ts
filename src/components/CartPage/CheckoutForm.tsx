import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';

type Props = {
  clientSecret: any;
};

interface OrderDetailsInterface {
  first_name: string;
  last_name: string;
  address: string;
  country: string;
  zipcode: string;
  email: string;
}

const orderDetailsInfo = {
  first_name: '',
  last_name: '',
  address: '',
  country: '',
  zipcode: '',
  email: '',
};

const CheckoutForm: React.FC<Props> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(
    orderDetailsInfo as OrderDetailsInterface
  );

  const { total_amount, total_with_discount, discount, cart, clearCart } =
    useCartContext();
  const { user } = useUserContext();

  const cart_checkout = cart.map((item) => {
    return {
      id: item.id,
      price: item.price,
      amount: item.amount,
      name: item.name,
      image: item.image,
    };
  });

  const order_details_data = {
    first_name: orderDetails.first_name,
    last_name: orderDetails.last_name,
    address: orderDetails.address,
    country: orderDetails.country,
    zipcode: orderDetails.zipcode,
    email: orderDetails.email,
    paid_amount: total_with_discount,
    discount: discount,
    total_amount_without_discount: total_amount,
    stripe_token: clientSecret,
  };

  const createUserOrder = async () => {
    try {
      await fetch(
        `https://noodles-api.herokuapp.com/api/users/create-order/${user?.user_name}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart_checkout,
            order_details_data: order_details_data,
          }),
        }
      ).then((response) => {
        if (response.status === 200) {
          setMessage(
            'Order Placed Successfully, soon you will be redirected to your orders page'
          );
          setTimeout(() => {
            clearCart();
            navigate('/');
          }, 3000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    if (
      orderDetails.first_name.length > 0 &&
      orderDetails.last_name.length > 0 &&
      orderDetails.address.length > 0 &&
      orderDetails.zipcode.length > 0 &&
      orderDetails.email.length > 0
    ) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        const { paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );

        switch (paymentIntent?.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            createUserOrder();
            setIsSuccess(true);
            break;
          case 'processing':
            console.log('processing');
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            console.log('processing');
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      }

      setIsLoading(false);
    } else {
      setIsLoading(false);
      setMessage('All fields are required');
    }
  };

  return (
    <Wrapper id='payment-form' onSubmit={handleSubmit}>
      <label htmlFor='name'>first name</label>
      <input
        type='text'
        id='firstName'
        name='firstName'
        value={orderDetails.first_name}
        onChange={(e) => {
          setOrderDetails({ ...orderDetails, first_name: e.target.value });
        }}
      />
      <label htmlFor='lastName'>last name</label>
      <input
        type='text'
        id='lastName'
        name='lastName'
        value={orderDetails.last_name}
        onChange={(e) => {
          setOrderDetails({ ...orderDetails, last_name: e.target.value });
        }}
      />
      <label htmlFor='address'>address</label>
      <input
        type='text'
        id='address'
        name='address'
        value={orderDetails.address}
        onChange={(e) => {
          setOrderDetails({ ...orderDetails, address: e.target.value });
        }}
      />
      <label htmlFor='country'>Country</label>
      <input
        type='text'
        id='country'
        name='country'
        value={orderDetails.country}
        onChange={(e) => {
          setOrderDetails({ ...orderDetails, country: e.target.value });
        }}
      />
      <label htmlFor='zipcode'>zipcode</label>
      <input
        type='text'
        id='zipcode'
        name='zipcode'
        value={orderDetails.zipcode}
        onChange={(e) => {
          setOrderDetails({ ...orderDetails, zipcode: e.target.value });
        }}
      />
      <label htmlFor='email'>email</label>
      <input
        type='text'
        id='email'
        name='email'
        value={orderDetails.email}
        onChange={(e) => {
          setOrderDetails({ ...orderDetails, email: e.target.value });
        }}
      />
      <CardElement id='payment-element' />
      <button
        disabled={isLoading || !stripe || !elements || isSuccess}
        id='submit'
      >
        <span id='button-text'>
          {isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </Wrapper>
  );
};
const Wrapper = styled.form``;
export default CheckoutForm;
