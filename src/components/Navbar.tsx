import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <NavLink to={'/login'}>LogIn</NavLink>
      <span> || </span>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};

export default Navbar;
