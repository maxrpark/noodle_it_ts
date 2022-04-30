import React, { useEffect } from 'react';
import { useContext, useReducer, useState } from 'react';
import global_reducer from '../reducers/global_reducer';
interface Brand {
  name: string;
  slug: string;
}

export interface NoodleDetails {
  id: number;
  name: string;
  images: string[];
  rating: number;
  slug: string;
  brand: Brand;
  category: string;
  price_per_package: string;
  price_per_unite: string;
  amount_per_package: number;
  description: string;
  ingredients: string[];
  tags: string[];
  instructions: string;
  spicy_level: string;
  spicy_level_number: number;
}

interface UseContextInterface {
  isModalOpen: boolean;
  selectedImg: string;
  coupon_code: string;
  closeModal: () => void;
  showImage: (e: React.MouseEvent<HTMLImageElement>) => void;
  theme: string;
  toogleTheme: () => void;
  openModal: () => void;
}

export interface InicialState {
  isModalOpen: boolean;
  selectedImg: string;
  coupon_code: string;
}

const initialState: InicialState = {
  isModalOpen: false,
  selectedImg: '',
  coupon_code: '',
};

const AppContext = React.createContext({} as UseContextInterface);

const AppProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  const [state, dispatch] = useReducer(
    global_reducer,
    initialState as InicialState
  );

  const toogleTheme = () => {
    setTheme((oldTheme) => {
      let newValue;
      if (oldTheme === 'light') {
        newValue = 'dark';
      } else {
        newValue = 'light';
      }
      localStorage.setItem('theme', newValue);
      return newValue;
    });
  };

  const createCouponCode = () => {
    const day = new Date().getDate();
    let descountType;

    if (day <= 10) {
      descountType = 'BUY_NOW';
    } else if (day > 10 && day <= 25) {
      descountType = 'ON_FIRE';
    } else {
      descountType = 'CRAZY_DAYS';
    }

    const couponCode = `NOODLE_IT_${descountType}`;
    dispatch({ type: 'COUPON_CODE', payload: couponCode });
  };

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
    document.body.style.overflow = 'scroll';
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    document.body.style.overflow = 'scroll';
  };

  const showImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    dispatch({ type: 'OPEN_MODAL' });
    dispatch({ type: 'OPEN_WITH_IMG', payload: img.src });
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    createCouponCode();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        closeModal,
        showImage,
        openModal,
        theme,
        toogleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
