import React, { useEffect, useContext, useReducer } from 'react';

// import { NoodleDetails } from './productsContext';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import { cartAnimation } from '../utils/helperFunctions';

import cart_reducer from '../reducers/cart_reducer';
import { ActionType } from '../ts/states/action-types';

import { CartContent } from '../ts/interfaces/global_interfaces';

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart') as string);
  } else {
    return [];
  }
};

interface CartInterface {
  cart: CartContent[];
  total_items: number;
  total_amount: number;
  total_with_discount: number;
  discount: number;
  has_discount: boolean;
  addToCartFunc: (id: string, noodle: NoodleDetails, amount: number) => void;
  removeItem: (id: string) => void;
  toggleAmount: (id: string, value: string) => void;
  clearCart: () => void;
  check_coupon: (userCodeInput: string) => void;
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  total_with_discount: 0,
  has_discount: false,
  discount: 0,
};

export interface InitialState {
  //  cart: getLocalStorage(),
  cart: CartContent[];
  total_items: number;
  total_amount: number;
  total_with_discount: number;
  has_discount: boolean;
  discount: number;
}

const CartContext = React.createContext({} as CartInterface);

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    cart_reducer,
    initialState as InitialState
  );

  const addToCartFunc = (id: string, noodle: NoodleDetails, amount: number) => {
    dispatch({
      type: ActionType.ADD_TO_CART,
      payload: { id, amount, noodle },
    });
    cartAnimation();
  };

  // remove item
  const removeItem = (id: string) => {
    dispatch({ type: ActionType.REMOVE_CART_ITEM, payload: id });
  };

  // toggle amount
  const toggleAmount = (ID: string, value: string) => {
    dispatch({
      type: ActionType.TOGGLE_CART_ITEM_AMOUNT,
      payload: { ID, value },
    });
  };
  // clear cart
  const clearCart = () => {
    dispatch({ type: ActionType.CLEAR_CART });
  };

  const check_coupon = (userCodeInput: string) => {
    dispatch({ type: ActionType.CHECK_COUPON, payload: userCodeInput });
  };

  useEffect(() => {
    dispatch({ type: ActionType.COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart, state.total_with_discount]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCartFunc,
        removeItem,
        toggleAmount,
        clearCart,
        check_coupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
