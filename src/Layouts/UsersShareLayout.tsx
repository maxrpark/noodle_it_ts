import React from 'react';
import NavbarUser from '../components/NavbarUser';
import { Outlet } from 'react-router-dom';

const UsersShareLayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default UsersShareLayout;
