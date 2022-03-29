import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useGlobalContext } from '../Context';

const Navbar = () => {
  const { logUserOut } = useGlobalContext();
  return (
    <div>
      {' '}
      <button onClick={logUserOut}>Link</button>
      <Link to={'/login'}>LogIn</Link>
    </div>
  );
};

export default Navbar;
