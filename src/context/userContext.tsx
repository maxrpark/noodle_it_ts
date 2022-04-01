import React, { useContext, useState, useEffect, useReducer } from 'react';
import user_reducer from '../reducers/user_reducer';
import axiosInstance from '../auth_axios';
import axios from 'axios';

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
  setAuthTokens: string | null;
  setuserAuth: string | null;
  userAuth: userDetails | null;
  getUserDetails: () => void;
  logOutUser: () => void;
  userLoggedIn: (formData: any) => void;
};

const initialState = {
  user: null as userDetails | null,
  authTokens: null as authTokensInt | null,
  isAlreadyLogIn: false,
  userAuth: null as userDetails | null,
};

const UserContext = React.createContext({} as UserContextType);

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispach] = useReducer(user_reducer, initialState);
  const logOutUser = async () => {
    try {
      await axiosInstance.post('user/logout/blacklist/', {
        refresh_token: localStorage.getItem('refresh_token'),
      });

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // @ts-ignore: Unreachable code error
      axiosInstance.defaults.headers['Authorization'] = null;
      dispach({ type: 'LOG_OUT_USER' });
    } catch (err) {
      console.log(err);
    }
  };

  const userLoggedIn = async (formData: any) => {
    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        // @ts-ignore: Unreachable code error
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');

        if (res.status === 200) {
          dispach({ type: 'LOG_IN', payload: res.data });
        } else {
          alert('Something went wrong!');
        }
      });
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/user/user-details/${state.userAuth.user_id}`
      );
      dispach({ type: 'GET_USER_DETAILS', payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const logUserBackIn = () => {
    dispach({ type: 'LOG_BACK' });
  };

  useEffect(() => {
    if (state.userAuth !== null) {
      getUserDetails();
    } else if (
      localStorage.getItem('access_token') &&
      state.isAlreadyLogIn === false
    ) {
      logUserBackIn();
    } else {
      console.log('User is logged out');
    }
  }, [state.userAuth]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUserDetails,
        logOutUser,
        userLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
