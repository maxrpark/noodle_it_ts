import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../auth_axios';
import axios from 'axios';

import jwt_decode from 'jwt-decode';

interface authTokensInt {
  access: string;
  refresh: string;
}
export interface userDetails {
  email: string;
  first_name: string;
  id: number;
  user_id: number;
  last_login: string;
  user_name: string;
  favorites: any[];
}

type UserContextType = {
  user: userDetails | null;
  authTokens: authTokensInt | null;
  setAuthTokens: any;
  setuserAuth: any;
  userAuth: userDetails | null;
  isAlreadyLogIn: boolean;
  logUserOut: () => void;
  setUser: React.Dispatch<React.SetStateAction<userDetails | null>>;
  getUserDetails: () => void;
  setIsAlreadyLogIn: (arg0: boolean) => void;
};

const UserContext = React.createContext({} as UserContextType);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as userDetails | null);
  const [isAlreadyLogIn, setIsAlreadyLogIn] = useState(false);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')!
      : null
  ) as [authTokensInt | null, any];

  const [userAuth, setuserAuth] = useState(() =>
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

  const getUserDetails = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/user/user-details/${userAuth!.user_id}`
    );

    console.log(res.data);
    setUser(res.data);
  };

  console.log(isAlreadyLogIn);

  useEffect(() => {
    if (userAuth !== null && isAlreadyLogIn === false) {
      getUserDetails();
      console.log('logg in');
    } else if (userAuth !== null) {
      console.log('userAuth is null');
    } else {
      console.log('User is logged out');
    }
  }, [userAuth]);
  return (
    <UserContext.Provider
      value={{
        authTokens,
        userAuth,
        setuserAuth,
        setAuthTokens,
        user,
        isAlreadyLogIn,
        logUserOut,
        setUser,
        getUserDetails,
        setIsAlreadyLogIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
