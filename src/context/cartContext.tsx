import React, { useEffect, useContext, useReducer } from 'react';

import { NoodleDetails } from './productsContext';
import cart_reducer from '../reducers/cart_reducer';

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart') as any);
  } else {
    return [];
  }
};

interface CartContent {
  id: string;
  image: string;
  name: string;
  price: string;
}
interface CartInterface {
  // cart: CartContent[];
  cart: CartContent[];
  total_items: number;
  total_amount: number;
  addToCartFunc: (
    id: string | number,
    noodle: NoodleDetails,
    amount: number
  ) => void;
  removeItem: (id: string | number) => void;
  toggleAmount: (id: string | number, value: number) => void;
  clearCart: () => void;
}

const initialState = {
  cart: getLocalStorage(),
  // filtered_products: [] as NoodleDetails[],
  total_items: 0,
  total_amount: 0,
};

const CartContext = React.createContext({} as CartInterface);

export const CartProvider: React.FC = ({ children }) => {
  // add to cart
  const [state, dispatch] = useReducer(cart_reducer, initialState as any);

  const addToCartFunc = (
    id: string | number,
    noodle: NoodleDetails,
    amount: number
  ) => {
    dispatch({
      type: 'ADD_TO_CART',

      payload: { id, amount, noodle },
    });
  };

  // remove item
  const removeItem = (id: string | number) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: id });
  };

  // toggle amount
  const toggleAmount = (id: string | number, value: number) => {
    console.log(id, value);
    dispatch({ type: 'TOGGLE_CART_ITEM_AMOUNT', payload: { id, value } });
  };
  // clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  useEffect(() => {
    dispatch({ type: 'COUNT_CART_TOTALS' });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCartFunc, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
