import jwt_decode from 'jwt-decode';

const user_reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOG_IN':
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
    case 'GET_USER_DETAILS':
      return {
        ...state,
        user: action.payload,
        isAlreadyLogIn: true,
      };
    case 'LOG_BACK':
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
    case 'LOG_OUT_USER':
      return {
        ...state,
        user: null,
        isAlreadyLogIn: false,
        authTokens: null,
        userAuth: null,
      };
    case 'GET_FAVORITES_NOODLES':
      let noodles = action.payload;
      const favoritesList = noodles.filter((elem: { slug: any }) => {
        // @ts-ignore: Unreachable code error
        return state.user?.favorites.find(({ slug }) => elem.slug === slug);
      });
      return {
        ...state,
        favoritesNoodles: favoritesList,
      };
    case 'IS_USER_FAVORITES_NOODLE':
      let noodle = action.payload;
      let isFavorite;
      // @ts-ignore: Unreachable code error
      if (state.user?.favorites.find(({ slug }) => slug === noodle.slug)) {
        isFavorite = true;
      } else {
        isFavorite = false;
      }
      return {
        ...state,
        isFavoriteNoodle: isFavorite,
      };
    case 'SET_USER_FAVORITES_NOODLE':
      return {
        ...state,
        isFavoriteNoodle: !state.isFavoriteNoodle,
      };
    default:
      return state;
  }
};

export default user_reducer;
