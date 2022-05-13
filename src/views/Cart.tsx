import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';
import { useUserContext } from '../context/userContext';
import { Link } from 'react-router-dom';

import {
  CartContent,
  CartDetails,
  ModalCart,
  PageTitle,
  FallbackMessegeComponent,
} from '../components';
import { useGlobalContext } from '../context/globalContext';

const Cart: React.FC = () => {
  const { userAuth } = useUserContext();
  const { cart } = useCartContext();
  const { isModalOpen } = useGlobalContext();

  useEffect(() => {}, [userAuth]);

  if (cart.length === 0) {
    return (
      <>
        <PageTitle title={'Your Cart'} image={''} />
        <div className='page-100 center'>
          <FallbackMessegeComponent title='No items in your cart yet'>
            <Link className='btn' to={'/products'}>
              See products
            </Link>
          </FallbackMessegeComponent>
        </div>
      </>
    );
  }

  return (
    <Wrapper>
      <PageTitle title={'Your Cart'} image={''} />
      <div className='section-center page-100'>
        <CartContent cart={cart} />
        <CartDetails />
        {!userAuth && isModalOpen && <ModalCart />}
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

    /* padding: 0 1rem; */

    @media screen and (min-width: 768px) {
      display: grid;
      padding: 0;
      grid-template-columns: 1fr 400px;
    }
  }
`;

export default Cart;
