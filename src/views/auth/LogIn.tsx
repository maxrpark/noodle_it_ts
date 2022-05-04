import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { LogInComponent } from '../../components';

import { useUserContext } from '../../context/userContext';

const LogIn: React.FC = () => {
  const { userAuth } = useUserContext();

  const history = useNavigate();
  useEffect(() => {
    if (userAuth) {
      history('/');
      // history('/cart');
    }
  }, [userAuth]);

  return (
    <div className='page-100 center'>
      <h1>Log In</h1>
      <LogInComponent />
    </div>
  );
};

export default LogIn;
