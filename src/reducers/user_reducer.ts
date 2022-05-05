import jwt_decode from 'jwt-decode';
import { InitialState } from '../context/userContext';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import { ActionType } from '../ts/states/action-types';
import { Actions } from '../ts/states/actions/user_actions';
import { toastSuccessBottom } from '../utils/toast';

const user_reducer = (state: any, action: Actions) => {
  switch (action.type) {
    case ActionType.LOG_IN:
      const data = action.payload;
      let token = data.access;
      let decoded = jwt_decode(token);
      return {
        ...state,
        user: null,
        isAlreadyLogIn: true,
        authTokens: token,
        userAuth: decoded,
      };
    case ActionType.GET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
        isAlreadyLogIn: true,
        favoritesNoodles: [...action.payload.favorites],
      };
    case ActionType.LOG_BACK:
      const authTokens = localStorage.getItem('access_token')
        ? localStorage.getItem('access_token')!
        : null;
      const userAuth = localStorage.getItem('access_token')
        ? jwt_decode(localStorage.getItem('access_token')!)
        : null;
      return {
        ...state,
        authTokens: authTokens,
        userAuth: userAuth,
      };
    case ActionType.TOOGLE_FORM:
      let { isRegistrationForm } = state;
      return {
        ...state,
        isRegistrationForm: !isRegistrationForm,
      };
    case ActionType.LOG_OUT_USER:
      return {
        ...state,
        user: null,
        isAlreadyLogIn: false,
        authTokens: null,
        userAuth: null,
      };

    /// USER FAVORITES
    case ActionType.GET_FAVORITES_NOODLES:
      let noodles = action.payload;
      const favoritesList = noodles.filter((elem: { slug: string }) => {
        // @ts-ignore: Unreachable code error
        return state.favoritesNoodles.find(({ slug }) => elem.slug === slug);
      });
      return {
        ...state,
        favoritesNoodles: favoritesList,
      };
    case ActionType.IS_USER_FAVORITE_NOODLE:
      let noodle = action.payload;
      let isFavorite;

      // @ts-ignore: Unreachable code error
      if (state.favoritesNoodles?.find(({ slug }) => slug === noodle.slug)) {
        isFavorite = true;
      } else {
        isFavorite = false;
      }
      return {
        ...state,
        isFavoriteNoodle: isFavorite,
      };
    case ActionType.SET_USER_FAVORITES_NOODLE:
      let userCurrentList = state.favoritesNoodles;
      let list = [];

      if (
        userCurrentList.length &&
        userCurrentList.find(
          (elem: NoodleDetails) => elem.slug === action.payload.noodle.slug
        )
      ) {
        list = userCurrentList.filter(
          (elem: NoodleDetails) => elem.slug !== action.payload.noodle.slug
        );
        toastSuccessBottom('Remove to favorites');
      } else {
        list.push(...userCurrentList, action.payload.noodle);
        toastSuccessBottom('added to favorites');
      }
      return {
        ...state,
        isFavoriteNoodle: !state.isFavoriteNoodle,
        favoritesNoodles: list,
      };
    default:
      return state;
  }
};

export default user_reducer;
