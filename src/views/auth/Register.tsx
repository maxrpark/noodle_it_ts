import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/auth_axios';

const Register: React.FC = () => {
  const history = useNavigate();
  const [userInfo, setUserInfo] = useState({
    user_name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!userInfo.user_name && !userInfo.email && !userInfo.password) {
      console.log('Please enter user name, email and password');
    } else if (!userInfo.user_name) {
      console.log('Please enter user name');
    } else if (!userInfo.email) {
      console.log('Please enter email');
    } else if (!userInfo.password) {
      console.log('Please enter password');
    } else {
      try {
        axiosInstance
          .post(`user/create/`, {
            email: userInfo.email,
            user_name: userInfo.user_name,
            password: userInfo.password,
          })
          .then((res) => {
            history('/login');
            console.log(res);
            console.log(res.data);
          });
      } catch (error) {
        // history.push('/');
        console.log(error);
      }
    }
  };
  return (
    <div className='page-100'>
      <h1>Register</h1>
      <form className='user-form'>
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
        <button className='form-btn' onClick={handleSubmit}>
          Register
        </button>
        <p className='form-link'>
          Already have an account? <Link to={'/login'}>LogIn</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
