import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { useUserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import { navLinks } from '../utils/links';

const Sidebar: React.FC = () => {
  const { toogleMenu, isSidebarOpen } = useGlobalContext();
  const { user, logOutUser } = useUserContext();

  const handleLogout = () => {
    logOutUser();
    toogleMenu();
  };

  return (
    <Wrapper className={`${!isSidebarOpen ? 'hidde-sidebar' : ''}`}>
      <button onClick={toogleMenu}>close</button>
      <div className='sidebar-content'>
        <h1>Sidebar</h1>
        {user && (
          <div className='user-info'>
            <button onClick={handleLogout}>Logout</button>
            <Link onClick={toogleMenu} to={'/dashboard'}>
              Profile
            </Link>
          </div>
        )}
        {navLinks.map((link) => {
          return (
            <Link onClick={toogleMenu} className='link' to={link.path}>
              {link.name}
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 100%;
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  transition: all 0.5s linear;

  @media screen and (min-width: 960px) {
    width: 30%;
  }
`;
export default Sidebar;
