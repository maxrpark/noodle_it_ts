import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const NavbarUser = () => {
  const { logUserOut } = useUserContext();
  return (
    <div>
      <button onClick={logUserOut}>Log Out</button>
      <NavLink to={'/dashboard'}>Profile</NavLink>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};
export default NavbarUser;
