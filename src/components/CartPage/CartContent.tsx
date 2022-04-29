import React from 'react';
import styled from 'styled-components';
import { CartItem } from '..';

interface CartInterface {
  id: string;
  image: string;
  name: string;
  price: string;
  amount: number;
  brand: string;
  rating: string | number;
  category: string;
}
interface Props {
  cart: CartInterface[];
}

const CartContent: React.FC<Props> = ({ cart }) => {
  return (
    <Wrapper>
      {/* <section className='items-container'> */}
      {cart.map((item: CartInterface) => {
        return <CartItem key={item.id} item={item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: flex; */
  /* .items-container { */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* } */
  img {
    /* width: 100%; */
    height: 200px;
  }
  .another-section {
    background-color: red;
    height: 300px;
  }
  /* @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  } */
`;

export default CartContent;
