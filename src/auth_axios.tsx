import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    // @ts-ignore: Unreachable code error
    Authorization: localStorage.getItem('authTokens.access')
      ? 'JWT ' + localStorage.getItem('authTokens.access')
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  async function (error) {
    const errorType = error.response.data.error;
    const originalRequest = error.config;

    if (error.response.statusText === 'Unauthorized') {
      alert('No active account found with the given credentials');
      return Promise.reject(error);
    }

    // Users errors
    if (errorType === 'empty_values') {
      alert('Please fill all the fields');
      return Promise.reject(error);
    }
    if (errorType === 'No active account found with the given credentials') {
      alert('Please fill all the fields');
      return Promise.reject(error);
    }

    if (errorType === 'email_error') {
      alert('Please enter a valid email address');
      return Promise.reject(error);
    }

    if (errorType === 'email_exist') {
      alert('This email already exist');
      return Promise.reject(error);
    }

    if (errorType === 'user_name_length') {
      alert('User name must be at least 3 characters long');
      return Promise.reject(error);
    }

    if (errorType === 'user_name_exist') {
      alert('User name already exists, please choose another one.');
      return Promise.reject(error);
    }

    if (errorType === 'password_length') {
      alert('Password must be at least 8 characters long.');
      return Promise.reject(error);
    }
    if (errorType === 'user_name_exist') {
      alert('This email address is already used by another account.');
      return Promise.reject(error);
    }

    if (typeof error.response === 'undefined') {
      alert(
        'A server/network error occurred. ' +
          'Looks like CORS might be the problem. ' +
          'Sorry about this - we will get it fixed shortly.'
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + 'token/refresh/'
    ) {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/token/refresh/', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);
              // @ts-ignore: Unreachable code error
              axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + response.data.access;
              originalRequest.headers['Authorization'] =
                'JWT ' + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          window.location.href = '/login/';
        }
      } else {
        console.log('Refresh token not available.');
        window.location.href = '/login/';
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
