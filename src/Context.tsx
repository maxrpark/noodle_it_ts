import React from 'react';
import { useContext, useState, useEffect } from 'react';
import axiosInstance from './auth_axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import jwt_decode from 'jwt-decode';
interface Brand {
  name: string;
  slug: string;
}

interface UserAuthInt {
  access: string;
  refresh: string;
}
export interface UserDetails {
  email: string;
  first_name: string;
  id: number;
  user_id: number;
  last_login: string;
  user_name: string;
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
  userDetails: UserDetails | null;
  isModalOpen: boolean;
  selectedImg: string;
  userAuth: UserAuthInt | null;
  setUserAuth: any;
  setUserDetails: any;
  openImg: (e: React.MouseEvent<HTMLImageElement>) => void;
  closeModal: () => void;
  logUserOut: () => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const AppContext = React.createContext({} as UseContextInterface);

const AppProvider: React.FC = ({ children }) => {
  const [selectedImg, setSelectedImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 'access_token', res.data.access;
  let [userAuth, setUserAuth] = useState(() =>
    localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')!
      : null
  ) as [UserAuthInt | null, any];

  let [userDetails, setUserDetails] = useState(() =>
    localStorage.getItem('access_token')
      ? jwt_decode(localStorage.getItem('access_token')!)
      : null
  ) as any;

  const logUserOut = () => {
    axiosInstance.post('user/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    setUserAuth(null);
    setUserDetails(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // @ts-ignore: Unreachable code error
    axiosInstance.defaults.headers['Authorization'] = null;
  };

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
  useEffect(() => {}, [userAuth]);
  return (
    <AppContext.Provider
      value={{
        userAuth,
        isModalOpen,
        selectedImg,
        userDetails,
        setUserDetails,
        setUserAuth,
        closeModal,
        openImg,
        setIsModalOpen,
        logUserOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
