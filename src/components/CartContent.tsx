import React from 'react';
import styled from 'styled-components';

interface Props {
  cart: any;
}

interface CartContent {
  id: string;
  image: string;
  name: string;
  price: string;
  amount: string;
}

const CartContent: React.FC<Props> = ({ cart }) => {
  return (
    <Wrapper>
      {cart.map((item: CartContent) => {
        return (
          <div key={item.id} className='single-item'>
            <img src={item.image} alt='' />
            <p>{item.name}</p>
            <p>{item.amount}</p>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    /* width: 100%; */
    height: 200px;
  }
`;

export default CartContent;
