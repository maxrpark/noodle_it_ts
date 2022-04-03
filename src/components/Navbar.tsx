import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { ToogleTheme } from '../components';

const Navbar: React.FC = () => {
  return (
    <div>
      <ToogleTheme />
      <NavLink to={'/login'}>LogIn</NavLink>
      <span> || </span>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};

export default Navbar;
