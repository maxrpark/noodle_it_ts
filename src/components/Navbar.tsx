import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { ToogleTheme, Logo } from '../components';
import { FaShoppingCart } from 'react-icons/fa';
import { useGlobalContext } from '../context/globalContext';
import { useCartContext } from '../context/cartContext';

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
    }
  };

  useEffect(() => {
    if (query) {
      if (result?.length) {
        history('/search');
      }
    }
  }, [result]);

  return (
    <Wrapper>
      <div className='navbar'>
        <NavLink to={'/'} className='logo'>
          <Logo />
        </NavLink>
        <form onSubmit={handleSearch}>
          <input type='text' ref={search} />
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
          <FaBars onClick={toogleMenu} />
        </div>
        {/* <ToogleTheme /> */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
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
    gap: 1rem;
  }

  form {
    font-family: var(--primary-font-family);
    margin: 1rem auto;
    padding: 1rem;
    display: flex;
    width: 100%;
    max-width: 300px;
    margin: 0 0 0 auto;
  }
  input {
    justify-self: flex-end;
    /* height: 35px; */
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
  }

  @media screen and (min-width: 768px) {
    form {
      width: 100%;
      max-width: 300px;
      margin: 0 0 0 auto;
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
