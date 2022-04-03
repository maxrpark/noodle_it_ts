import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const CommonLayout: React.FC = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default CommonLayout;
