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
  const { userAuth } = useUserContext();
  return userAuth ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
