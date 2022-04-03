import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
const Navbar: React.FC = () => {
  return (
    <div>
      <NavLink to={'/login'}>LogIn</NavLink>
      <span> || </span>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};

export default Navbar;
