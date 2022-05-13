import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { ToogleTheme, Logo } from '../components';
import { FaShoppingCart } from 'react-icons/fa';
import { useGlobalContext } from '../context/globalContext';
import { useCartContext } from '../context/cartContext';
import { menuAnimation } from '../utils/helperFunctions';

import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

const NavbarUser: React.FC = () => {
  const { userAuth } = useUserContext();
  const { total_items } = useCartContext();
  const { searchUserQuery, query, result, toogleMenu } = useGlobalContext();

  const history = useNavigate();

  const search = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: any) => {
    // fix
    e.preventDefault()!;
    if (search.current?.value.length) {
      searchUserQuery(search.current!.value);
      search.current!.value = '';
    }
  };

  useEffect(() => {
    if (query) {
      if (result?.length) {
        history('/search');
      }
    }
  }, [result]);

  // const menuAnimation = () => {
  //   console.log('menuAnimation');
  //   let tl = gsap.timeline();

  //   tl.to('.sidebar-wrapper', {
  //     transformOrigin: 'center center',
  //     background: 'red',
  //     height: '100%',
  //     width: '100%',
  //     position: 'fixed',
  //     duration: 0.1,
  //   })
  //     .to('.sidebar-wrapper', {
  //       opacity: 1,
  //       duration: 0.5,
  //     })
  //     .to('.sidebar', {
  //       left: 0,
  //       duration: 0.3,
  //     })
  //     .to(
  //       '.close-btn',
  //       {
  //         opacity: 1,
  //         scale: 1,
  //         rotate: 360,
  //         onComplete: () => {
  //           console.log('onComplete');
  //           console.log(tl.progress());
  //         },
  //       },
  //       '+=1'
  //     );

  //   if (tl.progress() === 0) {
  //     tl.play();
  //   } else {
  //     tl.reverse();
  //   }
  // };

  return (
    <Wrapper>
      <div className='navbar'>
        <NavLink to={'/'} className='logo'>
          <Logo />
        </NavLink>
        <form onSubmit={handleSearch}>
          <input type='text' placeholder='search' ref={search} />
        </form>
        <div className='nav-items'>
          {userAuth ? (
            <>{/* <NavLink to={'/dashboard'}>Profile</NavLink> */}</>
          ) : (
            <>{/* <NavLink to={'/login'}>Log in</NavLink> */}</>
          )}

          <Link className='cart-icon' to={'/cart'}>
            <FaShoppingCart />
            <span className='item-amount'>{total_items}</span>
          </Link>
          <FaBars onClick={menuAnimation} />
        </div>
        {/* <ToogleTheme /> */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .nav-items {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  form {
    font-family: var(--primary-font-family);
    margin: 1rem auto;
    padding: 1rem;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 auto;
  }
  input {
    justify-self: flex-end;
    /* height: 35px; */
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    form {
      width: 100%;

      max-width: 500px;
      margin: 0 auto;
    }
  }

  .cart-icon {
    position: relative;
    height: 100%;
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-amount {
    position: absolute;
    top: -5px;
    right: -7px;
    height: 15px;
    width: 15px;
    background: ${(props) => props.theme.secondaryColor};
    padding: 3px;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  }
`;
export default NavbarUser;
