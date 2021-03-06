import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/auth_axios';
import { useUserContext } from '../context/userContext';
import { toastDangerBottom } from '../utils/toast';
type Props = {
  showBTN?: boolean;
};

const RegisterComponent: React.FC<Props> = ({ showBTN }) => {
  const history = useNavigate();
  const { showRegistration } = useUserContext();
  const [userInfo, setUserInfo] = useState({
    user_name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!userInfo.user_name && !userInfo.email && !userInfo.password) {
      toastDangerBottom('All fields are required');
      console.log('Please enter user name, email and password');
    } else if (!userInfo.user_name) {
      toastDangerBottom('Please enter user name');
      console.log('Please enter user name');
    } else if (!userInfo.email) {
      toastDangerBottom('Please enter your email');
      console.log('Please enter your email');
    } else if (!userInfo.password) {
      toastDangerBottom('Please enter password');
      console.log('Please enter password');
    } else {
      try {
        axiosInstance
          .post(`/create/`, {
            email: userInfo.email,
            user_name: userInfo.user_name,
            password: userInfo.password,
          })
          .then((res) => {
            history('/login');
          });
      } catch (error) {
        // history.push('/');
        console.log(error);
      }
    }
  };
  return (
    <>
      <form className='user-form'>
        {showBTN && <h4> Register </h4>}
        <div className='form-control'>
          <label>
            <span>User Name</span>
          </label>
          <input
            type='text'
            value={userInfo.user_name}
            onChange={(e) =>
              setUserInfo({ ...userInfo, user_name: e.target.value })
            }
          />
        </div>
        <div className='form-control'>
          <label>
            <span>Email</span>
          </label>
          <input
            type='text'
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>
        <div className='form-control'>
          <label>
            <span>Password</span>
          </label>
          <input
            type='password'
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>
        <button className='form-btn btn' onClick={handleSubmit}>
          Register
        </button>

        <p className='form-link'>
          Already have an account?
          {showBTN ? (
            <button type='button' onClick={showRegistration}>
              Log in
            </button>
          ) : (
            <Link to={'/login'}>Log in</Link>
          )}
        </p>
      </form>
    </>
  );
};

export default RegisterComponent;
