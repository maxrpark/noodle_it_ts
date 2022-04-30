import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';
import { useUserContext } from '../context/userContext';

import { CartContent, CartDetails, ModalCart } from '../components';
import { useGlobalContext } from '../context/globalContext';

const Cart: React.FC = () => {
  const { userAuth } = useUserContext();
  const { cart } = useCartContext();
  const { isModalOpen } = useGlobalContext();

  useEffect(() => {}, [userAuth]);

  if (cart.length === 0) {
    return <div className='page-100'>Your cart is currently empty</div>;
  }

  return (
    <Wrapper>
      <CartContent cart={cart} />
      <CartDetails />
      {!userAuth && isModalOpen && <ModalCart />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: flex; */
  /* .items-container { */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* position: relative; */

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export default Cart;
