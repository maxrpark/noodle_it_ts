import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../context/userContext';

interface InitialFormData {
  email: string;
  password: string;
}
const initialFormData = {
  email: '',
  password: '',
};
const LogIn: React.FC = () => {
  const { userLoggedIn, userAuth } = useUserContext();
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
    userLoggedIn(formData);
  };

  useEffect(() => {
    if (userAuth) {
      history('/');
    }
  }, [userAuth]);

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
