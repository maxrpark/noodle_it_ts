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
export interface UserDetails {
  email: string;
  first_name: string;
  id: number;
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
  userAuth: any;
  setUserAuth: any;
  setUserDetails: any;
  openImg: (e: React.MouseEvent<HTMLImageElement>) => void;
  closeModal: () => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const AppContext = React.createContext({} as UseContextInterface);

const AppProvider: React.FC = ({ children }) => {
  const [selectedImg, setSelectedImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [userAuth, setUserAuth] = useState(() =>
    localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')!
      : null
  );

  let [userDetails, setUserDetails] = useState(() =>
    localStorage.getItem('access_token')
      ? jwt_decode(localStorage.getItem('access_token')!)
      : null
  ) as any;

  const getUserDetails = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/user/user-details/${userDetails!.user_id}`
    );
    setUserDetails(res.data);
  };

  useEffect(() => {
    if (userAuth !== null) {
      getUserDetails();
    }
    console.log(userDetails);
  }, [userDetails, userAuth]);

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
        userAuth,
        isModalOpen,
        selectedImg,
        userDetails,
        setUserDetails,
        setUserAuth,
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
