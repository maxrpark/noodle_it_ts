import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { ToogleTheme } from '../components';

const Navbar: React.FC = () => {
  return (
    <div>
      <ToogleTheme />
      <NavLink to={'/'}>Home</NavLink>
      <span> || </span>
      <NavLink to={'/register'}>Register</NavLink>
      <span> || </span>
      <NavLink to={'/login'}>LogIn</NavLink>
    </div>
  );
};

export default Navbar;
