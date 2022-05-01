import React, { useEffect } from 'react';
import { useContext, useReducer, useState } from 'react';
import global_reducer from '../reducers/global_reducer';
// import { IGlobalState } from '../ts/interfaces/states/global_state';

interface UseContextInterface {
  isModalOpen: boolean;
  selectedImg: string;
  coupon_code: string;
  theme: string | null;
  closeModal: () => void;
  showImage: (e: React.MouseEvent<HTMLImageElement>) => void;
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

enum ActionType {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  OPEN_WITH_IMG = 'OPEN_WITH_IMG',
  COUPON_CODE = 'COUPON_CODE',
}
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
    let discountType;

    if (day <= 10) {
      discountType = 'BUY_NOW';
    } else if (day > 10 && day <= 25) {
      discountType = 'ON_FIRE';
    } else {
      discountType = 'CRAZY_DAYS';
    }

    const couponCode = `NOODLE_IT_${discountType}`;
    dispatch({ type: ActionType.COUPON_CODE, payload: couponCode });
  };

  const openModal = () => {
    dispatch({ type: ActionType.OPEN_MODAL });
    document.body.style.overflow = 'scroll';
  };

  const closeModal = () => {
    dispatch({ type: ActionType.CLOSE_MODAL });
    document.body.style.overflow = 'scroll';
  };

  const showImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    dispatch({ type: ActionType.OPEN_MODAL });
    dispatch({ type: ActionType.OPEN_WITH_IMG, payload: img.src });
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
        toogleTheme,
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
