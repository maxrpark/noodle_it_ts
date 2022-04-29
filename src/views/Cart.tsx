import React from 'react';

import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';

import { CartContent, CartDetails } from '../components';

const Cart: React.FC = () => {
  const { cart } = useCartContext();

  if (cart.length === 0) {
    return <div className='page-100'>Your cart is currently empty</div>;
  }
  return (
    <Wrapper>
      <CartContent cart={cart} />
      <CartDetails />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: flex; */
  /* .items-container { */
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export default Cart;
