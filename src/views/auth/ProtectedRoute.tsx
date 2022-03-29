import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../Context';

interface Props {
  children: any;
}

const ProtectedRoute: React.FC<Props> = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { userAuth } = useGlobalContext();
  return userAuth ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
