import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const NavbarUser = () => {
  const { logOutUser, userAuth } = useUserContext();
  const history = useNavigate();

  useEffect(() => {
    if (!userAuth) {
      history('/');
    }
  }, [userAuth]);

  return (
    <div>
      <button onClick={logOutUser}>Test logout</button>
      <NavLink to={'/dashboard'}>Profile</NavLink>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};
export default NavbarUser;
