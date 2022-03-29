import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth_axios';
import { useGlobalContext } from '../../Context';

import jwt_decode from 'jwt-decode';

interface InitialFormData {
  email: string;
  password: string;
}
const initialFormData = {
  email: '',
  password: '',
};
const LogIn = () => {
  const { setAuthTokens, setuserAuth } = useGlobalContext();
  const history = useNavigate();
  const [formData, updateFormData] = useState(
    initialFormData as InitialFormData
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [(e.target as HTMLInputElement).name]: (
        e.target as HTMLInputElement
      ).value.trim(),
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
          var token = res.data.access;
          var decoded = jwt_decode(token);
          setuserAuth(decoded);
          history('/dashboard');
          setAuthTokens(res.data.access);
        } else {
          alert('Something went wrong!');
        }
      });
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
