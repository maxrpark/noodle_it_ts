import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    console.log(userInfo);
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
  };
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>
          <span>User Name</span>
          <input
            type='text'
            value={userInfo.user_name}
            onChange={(e) =>
              setUserInfo({ ...userInfo, user_name: e.target.value })
            }
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type='text'
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type='password'
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </label>
        <button onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
};

export default Register;
