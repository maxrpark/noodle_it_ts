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
    default:
      return state;
  }
};

export default user_reducer;
