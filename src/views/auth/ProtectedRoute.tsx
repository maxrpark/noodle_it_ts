import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const userExist = localStorage.getItem('access_token');
  return userExist ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
