import React from 'react';
import { useCartContext } from '../../context/cartContext';
import { CartContent, SectionTitle } from '../index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CartSection: React.FC = () => {
  const { cart } = useCartContext();

  return (
    <Wrapper>
      <div className='detail-section'>
        <SectionTitle title={'My Cart'} urlPath='' text='' />
        <Link to={'/cart'} className='link' style={{ fontSize: '13px' }}>
          Go to Cart
        </Link>
      </div>
      <div className='cart-section'>
        <CartContent cart={cart} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .cart-section {
    /* padding: 1rem; */
  }
`;

export default CartSection;
