import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const ProtectedRouteRegister: React.FC<Props> = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const userExist = localStorage.getItem('access_token');
  return !userExist ? children : <Navigate to='/' replace />;
};

export default ProtectedRouteRegister;
