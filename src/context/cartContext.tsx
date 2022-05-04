import React, { useEffect, useContext, useReducer } from 'react';

// import { NoodleDetails } from './productsContext';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import { useGlobalContext } from '../context/globalContext';
import cart_reducer from '../reducers/cart_reducer';
import { ActionType } from '../ts/states/action-types';

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart') as string);
  } else {
    return [];
  }
};

export interface CartContent {
  id: string;
  image: string;
  name: string;
  price: string;
  brand: string;
  category: string;
  rating: string;
  amount: number;
}
interface CartInterface {
  cart: CartContent[];
  total_items: number;
  total_amount: number;
  total_with_discount: number;
  discount: number;
  has_discount: boolean;
  addToCartFunc: (
    id: string | number,
    noodle: NoodleDetails,
    amount: number
  ) => void;
  removeItem: (id: string | number) => void;
  toggleAmount: (id: string | number, value: string) => void;
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
  cart: CartContent;
  total_items: number;
  total_amount: number;
  total_with_discount: number;
  has_discount: false;
  discount: number;
}

const CartContext = React.createContext({} as CartInterface);

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    cart_reducer,
    initialState as InitialState
  );

  const addToCartFunc = (
    id: string | number,
    noodle: NoodleDetails,
    amount: number
  ) => {
    dispatch({
      type: ActionType.ADD_TO_CART,
      payload: { id, amount, noodle },
    });
  };

  // remove item
  const removeItem = (id: string | number) => {
    dispatch({ type: ActionType.REMOVE_CART_ITEM, payload: id });
  };

  // toggle amount
  const toggleAmount = (ID: string | number, value: string) => {
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
