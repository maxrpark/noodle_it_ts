import React from 'react';

import { RegisterComponent, LogInComponent } from '../../components';
import { useUserContext } from '../../context/userContext';

const Register: React.FC = () => {
  const { isRegistrationForm } = useUserContext();
  return (
    <div className='page-100 center'>
      <h1>Register</h1>
      {!isRegistrationForm ? <LogInComponent /> : <RegisterComponent />}
    </div>
  );
};

export default Register;
