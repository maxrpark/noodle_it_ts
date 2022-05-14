import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext, FormDataInterface } from '../context/userContext';
import { toastDangerBottom } from '../utils/toast';
const initialFormData = {
  email: '',
  password: '',
};

type Props = {
  showBTN?: boolean;
};

const LogInComponent: React.FC<Props> = ({ showBTN = false }) => {
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

  let timeOut: any;
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    clearTimeout(timeOut);
    if (!formData.email && !formData.password) {
      toastDangerBottom('All fields are required');
      console.log('Please enter email and password');
    } else if (!formData.email) {
      toastDangerBottom('Please enter email');
      console.log('Please enter email');
    } else if (!formData.password) {
      toastDangerBottom('Please enter password');
      console.log('Please enter password');
    } else {
      userLoggedIn(formData);
    }
  };
  return (
    <>
      <form className='user-form' onSubmit={handleSubmit}>
        <div className='info-user'>
          <p>test user</p>
          <p>email: user_1_test@user.com</p>
          <p>passworld: user_1_test</p>
        </div>
        {showBTN && <h4> Log In </h4>}
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
          {showBTN ? (
            <button className='link' type='button' onClick={showRegistration}>
              Register
            </button>
          ) : (
            <Link to={'/register'}>Register</Link>
          )}
        </p>
      </form>
    </>
  );
};

export default LogInComponent;
