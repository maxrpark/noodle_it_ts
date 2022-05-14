import React from 'react';
import { RegisterComponent } from '../../components';
import { usePageTitle } from '../../customHooks/UsePageTitle';

const Register: React.FC = () => {
  usePageTitle('Register'); // page title hook
  return (
    <div className='page-100-without-title center'>
      <h1>Register</h1>
      <RegisterComponent />
    </div>
  );
};

export default Register;
