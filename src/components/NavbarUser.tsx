import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { ToogleTheme } from '../components';
const NavbarUser: React.FC = () => {
  const { logOutUser, userAuth } = useUserContext();
  const history = useNavigate();

  useEffect(() => {
    if (!userAuth) {
      history('/');
    }
  }, [userAuth]);

  return (
    <div>
      <ToogleTheme />
      <button onClick={logOutUser}>Logout</button>
      <NavLink to={'/dashboard'}>Profile</NavLink>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};
export default NavbarUser;
