import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext, FormDataInterface } from '../context/userContext';

const initialFormData = {
  email: '',
  password: '',
};

const LogInComponent: React.FC = () => {
  const { userLoggedIn, showRegistration } = useUserContext();
  const [formData, updateFormData] = useState(
    initialFormData as FormDataInterface
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
    if (!formData.email && !formData.password) {
      console.log('Please enter email and password');
    } else if (!formData.email) {
      console.log('Please enter email');
    } else if (!formData.password) {
      console.log('Please enter email');
    } else {
      userLoggedIn(formData);
    }
  };
  return (
    <>
      <form className='user-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label>
            <span>Email</span>
          </label>
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label>
            <span>Password</span>
          </label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className='form-btn btn' type='submit'>
          Log In
        </button>
        <p className='form-link'>
          Don't an account already?
          <span> </span>
          <button type='button' onClick={showRegistration}>
            register
          </button>
          <Link to={'/register'}>Register</Link>
        </p>
      </form>
    </>
  );
};

export default LogInComponent;
