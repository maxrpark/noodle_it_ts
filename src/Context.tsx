import React from 'react';
import { useContext, useState, useEffect } from 'react';
// import axiosInstance from './auth_axios';
// import axios from 'axios';

import jwt_decode from 'jwt-decode';
interface Brand {
  name: string;
  slug: string;
}

interface authTokensInt {
  access: string;
  refresh: string;
}
export interface userAuth {
  email: string;
  first_name: string;
  id: number;
  user_id: number;
  last_login: string;
  user_name: string;
  favorites: any[];
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
  baseUrl: string;
  isModalOpen: boolean;
  selectedImg: string;
  openImg: (e: React.MouseEvent<HTMLImageElement>) => void;
  closeModal: () => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const AppContext = React.createContext({} as UseContextInterface);

const AppProvider: React.FC = ({ children }) => {
  const baseUrl = 'https://noodles-api.herokuapp.com/';

  const [selectedImg, setSelectedImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImg = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setSelectedImg(img.src);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'scroll';
  };

  return (
    <AppContext.Provider
      value={{
        baseUrl,
        isModalOpen,
        selectedImg,
        closeModal,
        openImg,
        setIsModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
