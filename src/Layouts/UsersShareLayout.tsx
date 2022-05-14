import React from 'react';
import { Outlet } from 'react-router-dom';

const UsersShareLayout: React.FC = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default UsersShareLayout;
