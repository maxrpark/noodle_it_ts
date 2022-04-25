import React, { useEffect, useContext, useReducer } from 'react';

import { NoodleDetails } from './productsContext';
import cart_reducer from '../reducers/cart_reducer';

// const getLocalStorage = () => {
//   let cart = localStorage.getItem('cart');
//   if (cart) {
//     return JSON.parse(localStorage.getItem('cart'));
//   } else {
//     return [];
//   }
// };

interface CartInterface {
  cart: {};
  total_items: number;
  total_amount: number;
}

const initialState = {
  cart: {} as NoodleDetails,
  filtered_products: [] as NoodleDetails[],
  total_items: 0,
  total_amount: 0,
};

const CartContext = React.createContext<CartInterface | {}>({});

export const CartProvider: React.FC = ({ children }) => {
  // add to cart
  const [state, dispatch] = useReducer(cart_reducer, initialState as any);

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      // payload: { id, color, amount, product }
    });
  };
  return (
    <CartContext.Provider value={'hello'}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
