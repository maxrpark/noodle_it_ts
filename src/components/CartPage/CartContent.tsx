import React from 'react';
import styled from 'styled-components';
import { CartItem } from '../index';
import { CartContent as CartInterface } from '../../ts/interfaces/global_interfaces';

interface Props {
  cart: CartInterface[];
}

const CartContent: React.FC<Props> = ({ cart }) => {
  return (
    <Wrapper>
      {cart.map((item: CartInterface) => {
        return <CartItem key={item.id} item={item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* } */
  img {
    /* width: 100%; */
    height: 200px;
  }
`;

export default CartContent;
