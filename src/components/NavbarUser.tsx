import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useGlobalContext } from '../Context';

const NavbarUser = () => {
  const { logUserOut } = useGlobalContext();
  return (
    <div>
      <button onClick={logUserOut}>Log Out</button>
      <NavLink to={'/dashboard'}>Profile</NavLink>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};
export default NavbarUser;
