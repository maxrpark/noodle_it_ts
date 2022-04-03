import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { useGlobalContext } from '../context/globalContext';
const Navbar: React.FC = () => {
  const { toogleTheme } = useGlobalContext();
  return (
    <div>
      <button onClick={toogleTheme}>ChangeTHeme</button>
      <NavLink to={'/login'}>LogIn</NavLink>
      <span> || </span>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};

export default Navbar;
