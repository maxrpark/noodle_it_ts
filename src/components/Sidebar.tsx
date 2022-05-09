import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { useUserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import { navLinks } from '../utils/links';
import { AiOutlineClose } from 'react-icons/ai';

const Sidebar: React.FC = () => {
  const { toogleMenu, isSidebarOpen } = useGlobalContext();
  const { user, logOutUser } = useUserContext();

  const handleLogout = () => {
    logOutUser();
    toogleMenu();
  };

  return (
    <Wrapper className={`${!isSidebarOpen ? 'hidde-sidebar' : ''}`}>
      <button className='close-btn' onClick={toogleMenu}>
        <AiOutlineClose />
      </button>
      <div className='sidebar-content'>
        <h1 className='logo'>Noodle it!</h1>
        <div className='links-container'>
          {user && (
            <div className='user-info '>
              <Link className='link' onClick={toogleMenu} to={'/dashboard'}>
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
        {user ? (
          <div className='action-btns'>
            <button type='button' className='link' onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link onClick={toogleMenu} to={'/login'}>
            Login
          </Link>
        )}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 100%;
  width: 50%;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  transition: all 0.5s linear;

  button {
    font-size: 1rem;
  }
  @media screen and (min-width: 960px) {
    width: 30%;
  }
  .logo {
    margin-top: 1rem;
    text-align: center;
  }
  .links-container,
  .user-info {
    display: flex;
    flex-direction: column;
  }
  .close-btn {
    border: none;
    background: transparent;
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
export default Sidebar;
