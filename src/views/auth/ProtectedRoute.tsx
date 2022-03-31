import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

interface Props {
  children: any;
}

const ProtectedRoute: React.FC<Props> = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const userExist = localStorage.getItem('access_token');
  const { userAuth } = useUserContext();
  return userExist ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
