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
  userAuth: userAuth | null;
  user: userAuth | null;
  isModalOpen: boolean;
  selectedImg: string;
  authTokens: authTokensInt | null;
  setAuthTokens: any;
  setuserAuth: any;
  openImg: (e: React.MouseEvent<HTMLImageElement>) => void;
  closeModal: () => void;
  logUserOut: () => void;
  setUser: (user: userAuth) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const AppContext = React.createContext({} as UseContextInterface);

const AppProvider: React.FC = ({ children }) => {
  const [selectedImg, setSelectedImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({} as userAuth | null);

  // 'access_token', res.data.access;
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')!
      : null
  ) as [authTokensInt | null, any];

  let [userAuth, setuserAuth] = useState(() =>
    localStorage.getItem('access_token')
      ? jwt_decode(localStorage.getItem('access_token')!)
      : null
  ) as any;

  const logUserOut = () => {
    axiosInstance.post('user/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    setUser(null);
    setAuthTokens(null);
    setuserAuth(null);
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
  useEffect(() => {}, [authTokens, user]);
  return (
    <AppContext.Provider
      value={{
        authTokens,
        isModalOpen,
        selectedImg,
        userAuth,
        setuserAuth,
        setAuthTokens,
        user,
        closeModal,
        openImg,
        setIsModalOpen,
        logUserOut,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
