import React from 'react';
import { Card } from '../components';
import { useCartContext } from '../context/cartContext';

import { CartContent } from '../components';

const Cart: React.FC = () => {
  const { cart } = useCartContext();
  console.log(cart);
  return (
    <>
      <CartContent cart={cart} />
    </>
  );
};

export default Cart;
