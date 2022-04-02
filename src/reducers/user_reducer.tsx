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
        favoritesNoodles: action.payload.favorites,
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
      console.log(state.favoritesNoodles);
      // @ts-ignore: Unreachable code error
      if (state.favoritesNoodles?.find(({ slug }) => slug === noodle.slug)) {
        isFavorite = true;
      } else {
        isFavorite = false;
      }
      console.log(isFavorite);
      return {
        ...state,
        isFavoriteNoodle: isFavorite,
        // favoritesNoodles: state.user?.favorites,
      };
    case 'SET_USER_FAVORITES_NOODLE':
      let userCurrentList = state.favoritesNoodles;
      let list: any = [];

      if (
        userCurrentList.length &&
        userCurrentList.find(
          (elem: any) => elem.slug === action.payload.noodle.slug
        )
      ) {
        list = userCurrentList.filter(
          (elem: any) => elem.slug !== action.payload.noodle.slug
        );
      } else {
        list.push(...userCurrentList, action.payload.noodle);
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
