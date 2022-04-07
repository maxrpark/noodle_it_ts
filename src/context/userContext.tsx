import React, { useContext, useEffect, useReducer } from 'react';
import user_reducer from '../reducers/user_reducer';
import axiosInstance from '../utils/auth_axios';
import axios from 'axios';
import { BACK_END_URL } from '../utils/variables';
import { NoodleDetails, useProductsContext } from '../context/productsContext';

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
  favorites: NoodleDetails[];
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
  //
  favoritesNoodles: NoodleDetails[];
  isFavoriteNoodle: boolean;
  noodles: NoodleDetails[] | null;
  getUserFavoriteList: () => void;
  setUserFavoriteList: (user: string, noodle: NoodleDetails) => void;
  isUserFavoriteNoodle: () => void;
  isAlreadyLogIn: boolean;
};

const initialState = {
  user: null as userDetails | null,
  authTokens: null as authTokensInt | null,
  isAlreadyLogIn: false,
  userAuth: null as userDetails | null,
  favoritesNoodles: [] as NoodleDetails[],
  isFavoriteNoodle: false,
};

const UserContext = React.createContext({} as UserContextType);

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispach] = useReducer(user_reducer, initialState);
  const { noodles, noodle } = useProductsContext();

  const logOutUser = async () => {
    try {
      await axiosInstance.post('/logout/blacklist/', {
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
        `${BACK_END_URL}user-details/${state.userAuth.user_id}`
      );
      dispach({ type: 'GET_USER_DETAILS', payload: res.data });
      getUserFavoriteList();
    } catch (error) {
      console.log(error);
    }
  };

  const logUserBackIn = () => {
    dispach({ type: 'LOG_BACK' });
  };

  const getUserFavoriteList = () => {
    dispach({ type: 'GET_FAVORITES_NOODLES', payload: noodles });
  };

  const isUserFavoriteNoodle = () => {
    dispach({ type: 'IS_USER_FAVORITE_NOODLE', payload: noodle });
  };

  const setUserFavoriteList = async (user: string, noodle: NoodleDetails) => {
    try {
      axios({
        method: 'post',
        url: `${BACK_END_URL}user-favorites/${user}/${noodle.slug}/`,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFTOKEN',
        withCredentials: true,
      });
      dispach({ type: 'SET_USER_FAVORITES_NOODLE', payload: { noodle } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isUserFavoriteNoodle();
  }, [noodle]);

  useEffect(() => {
    getUserFavoriteList();
  }, [noodles]);

  useEffect(() => {
    if (state.userAuth !== null) {
      getUserDetails();
    } else if (state.user) {
      getUserFavoriteList();
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
        getUserFavoriteList,
        setUserFavoriteList,

        isUserFavoriteNoodle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
