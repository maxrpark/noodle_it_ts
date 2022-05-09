import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { ToogleTheme } from '../components';
import { FaShoppingCart } from 'react-icons/fa';
import { useGlobalContext } from '../context/globalContext';
import { useCartContext } from '../context/cartContext';

import styled from 'styled-components';

import { FaBars } from 'react-icons/fa';

const NavbarUser: React.FC = () => {
  const { logOutUser, userAuth } = useUserContext();
  const { total_items } = useCartContext();
  const { closeModal, searchUserQuery, query, result, toogleMenu } =
    useGlobalContext();

  const history = useNavigate();

  const handleLogout = () => {
    logOutUser();
    closeModal();
  };

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
      <NavLink to={'/'} className='logo'>
        Noodle It!
      </NavLink>
      <form onSubmit={handleSearch}>
        <input type='text' ref={search} />
      </form>
      <div className='nav-items'>
        {userAuth ? (
          <>
            <button onClick={() => handleLogout()}>Logout</button>
            <NavLink to={'/dashboard'}>Profile</NavLink>
          </>
        ) : (
          <>
            <NavLink to={'/login'}>Log in</NavLink>
          </>
        )}

        <Link className='cart-icon' to={'/cart'}>
          <FaShoppingCart />
          {total_items}
        </Link>
      </div>
      <FaBars onClick={toogleMenu} />
      {/* <ToogleTheme /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  .nav-items {
    display: flex;
  }

  @media screen and (min-width: 768px) {
    .nav-items {
      display: flex;
    }
  }
`;
export default NavbarUser;
