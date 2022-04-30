import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';

type Props = {};

const Checkout: React.FC = (props: Props) => {
  const { total_amount, has_descount, total_with_descount, descount, cart } =
    useCartContext();

  return (
    <Wrapper className='page-100'>
      {cart.map((item: any) => {
        const { name, price, amount, id } = item;
        return (
          <div key={id}>
            name:{name}
            <br />
            amount:{amount}
            <br />
            price:{price}
            <br />
            subTotal : {+item.price * item.amount}
            <br />
          </div>
        );
      })}
      <h2>Checkout</h2>
      <p>total:{total_amount}</p>
      <p>with discount:{total_with_descount}</p>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default Checkout;
