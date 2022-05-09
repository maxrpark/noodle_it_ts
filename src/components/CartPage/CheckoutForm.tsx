import React, { useState } from 'react';
import styled from 'styled-components';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';

type Props = {
  clientSecret: string;
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
      <div className='form-control'>
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
      </div>
      <div className='form-control'>
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
      </div>
      <div className='form-control'>
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
      </div>
      <div className='form-control'>
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
      </div>
      <div className='form-control'>
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
      </div>
      <div className='form-control'>
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
      </div>
      <div className='form-control'>
        <label htmlFor='cardNumber'>Card Number</label>
        <h3 className='test-card'>test: number 4242 4242 4242 4242</h3>
        <CardElement id='payment-element' />
      </div>
      <button
        disabled={isLoading || !stripe || !elements || isSuccess}
        id='submit'
      >
        <span id='button-text'>
          {isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
        </span>
      </button>
      {message && <div id='payment-message'>{message}</div>}
    </Wrapper>
  );
};
const Wrapper = styled.form`
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
  background: white;
  margin: 0 auto;
  .form-control {
    display: flex;
    text-transform: capitalize;
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
    border-width: 1px;
    border-style: inset;
    padding: 1rem;
    border-color: rgb(118, 118, 118);
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
export default CheckoutForm;
