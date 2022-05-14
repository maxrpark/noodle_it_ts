import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInComponent } from '../../components';
import { useUserContext } from '../../context/userContext';
import { usePageTitle } from '../../customHooks/UsePageTitle';
const LogIn: React.FC = () => {
  usePageTitle('Login'); // page title hook
  const { userAuth } = useUserContext();

  const history = useNavigate();
  useEffect(() => {
    if (userAuth) {
      history('/');
    }
  }, [userAuth]);

  return (
    <div className='page-100-without-title center'>
      <h1>Log In</h1>
      <LogInComponent />
    </div>
  );
};

export default LogIn;
