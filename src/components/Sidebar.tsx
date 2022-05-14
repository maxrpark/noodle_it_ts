import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { useUserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import { navLinks } from '../utils/links';
import { AiOutlineClose } from 'react-icons/ai';
import { menuAnimation } from '../utils/helperFunctions';
import { ToogleTheme } from '../components';
// import gsap from 'gsap';

const Sidebar: React.FC = () => {
  const { toogleMenu, isSidebarOpen } = useGlobalContext();
  const { user, logOutUser } = useUserContext();

  const handleLogout = () => {
    logOutUser();
    toogleMenu();
  };

  return (
    <Wrapper className='sidebar-wrapper'>
      <aside className={`${!isSidebarOpen ? 'hidde-sidebar' : ''} sidebar`}>
        <button className='close-btn' onClick={menuAnimation}>
          <AiOutlineClose />
        </button>
        <div className='sidebar-content'>
          <h1 className='logo'>Noodle it!</h1>
          <div className='links-container'>
            {user && (
              <div className='user-info optional-link'>
                <Link
                  className='link'
                  onClick={menuAnimation}
                  to={'/dashboard'}
                >
                  Profile
                </Link>
              </div>
            )}

            {navLinks.map((link) => {
              return (
                <Link
                  key={link.id}
                  onClick={menuAnimation}
                  className='link'
                  to={link.path}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          {user ? (
            <div className='action-btns'>
              <button
                type='button'
                className='link optional-link'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              onClick={menuAnimation}
              className='link optional-link'
              to={'/login'}
            >
              Login
            </Link>
          )}
          <ToogleTheme />
        </div>
      </aside>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  opacity: 0;
  background: ${(props) => props.theme.modalBack};
  z-index: 10;

  aside {
    min-height: 100%;
    width: 50%;
    background-color: ${(props) => props.theme.cardColor};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    transition: all 0.5s linear;
    display: flex;
    justify-content: center;
    left: -100%;
    z-index: 10;
    @media screen and (min-width: 960px) {
      width: 30%;
    }
  }

  button,
  a {
    font-size: 1rem;
    transition: var(--transition-1);
  }
  button:hover,
  a:hover {
    font-size: 1rem;
    transform: translateX(6px) scale(1.1);
    opacity: 1;
  }
  .optional-link {
    color: ${(props) => props.theme.textColor};
  }

  .logo {
    margin-top: 2rem;
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
    right: -40px;
    top: 30px;
    opacity: 0;
    transform: scale(0);
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 50%;
  }
  .link {
    display: block;
  }
`;
export default Sidebar;
