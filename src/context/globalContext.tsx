import React, { useEffect, useContext, useReducer, useState } from 'react';
import global_reducer from '../reducers/global_reducer';
import { ActionType } from '../ts/states/action-types';
import axios from 'axios';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import { toastWarningTop } from '../utils/toast';
interface UseContextInterface {
  isModalOpen: boolean;
  isSidebarOpen: boolean;
  selectedImg: string;
  coupon_code: string;
  theme: string | null;
  query: string;
  result: NoodleDetails[] | null;
  isLoading: boolean;
  closeModal: () => void;
  showImage: (e: React.MouseEvent<HTMLImageElement>) => void;
  toogleTheme: () => void;
  openModal: () => void;
  toogleMenu: () => void;
  searchUserQuery: (query: string) => void;
}

export interface InicialState {
  isModalOpen: boolean;
  isSidebarOpen: boolean;
  selectedImg: string;
  coupon_code: string;
  isLoading: boolean;
  query: string;
  result: NoodleDetails[] | null;
}

const initialState: InicialState = {
  isModalOpen: false,
  selectedImg: '',
  coupon_code: '',
  query: '',
  result: null,
  isLoading: false,
  isSidebarOpen: false,
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

  // toogleMenu
  const toogleMenu = () => {
    dispatch({ type: ActionType.TOOGLE_SIDEBAR });
    document.body.style.overflow = 'scroll';
  };

  const showImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    console.log(img);
    dispatch({ type: ActionType.OPEN_MODAL });
    dispatch({ type: ActionType.OPEN_WITH_IMG, payload: img.src });
    document.body.style.overflow = 'hidden';
  };
  const searchUserQuery = async (query: string) => {
    state.query = '';
    state.result = null;
    dispatch({ type: ActionType.SEARCH_START, payload: query });
    try {
      const response = await axios.get(
        'https://noodles-api.herokuapp.com/api/v1/search/?query=' + query
      );
      const data = {
        result: response.data,
        query: query,
      };
      if (response.data.length) {
        dispatch({ type: ActionType.SEARCH_RESULT, payload: data });
      } else {
        dispatch({ type: ActionType.NO_RESULT_FOUND });
        // alert('No results found');
        toastWarningTop('No Result found!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createCouponCode();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        theme,
        closeModal,
        showImage,
        openModal,
        toogleTheme,
        searchUserQuery,
        toogleMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
