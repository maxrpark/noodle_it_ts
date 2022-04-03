import React from 'react';
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
}

interface UseContextInterface {
  isModalOpen: boolean;
  selectedImg: string;
  closeModal: () => void;
  showImage: (e: React.MouseEvent<HTMLImageElement>) => void;
  theme: string;
  toogleTheme: () => void;
}

export interface InicialState {
  isModalOpen: boolean;
  selectedImg: string;
}

const initialState: InicialState = {
  isModalOpen: false,
  selectedImg: '',
};

const AppContext = React.createContext({} as UseContextInterface);

const AppProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const [state, dispatch] = useReducer(
    global_reducer,
    initialState as InicialState
  );

  const toogleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log(theme);
  };

  const closeModal = () => {
    dispatch({ type: 'IS_MODAL_OPEN' });
  };

  const showImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    dispatch({ type: 'OPEN_WITH_IMG', payload: img.src });
    document.body.style.overflow = 'hidden';
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        closeModal,
        showImage,
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
