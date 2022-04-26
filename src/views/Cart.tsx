import React from 'react';
import { useCartContext } from '../context/cartContext';

const Cart: React.FC = () => {
  const { cart } = useCartContext();
  return <div>Cart</div>;
};

export default Cart;
