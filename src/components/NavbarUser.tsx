import { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { ToogleTheme } from '../components';
import { FaShoppingCart } from 'react-icons/fa';
import { useGlobalContext } from '../context/globalContext';

import styled from 'styled-components';

import { FaBars } from 'react-icons/fa';
import axios from 'axios';
const NavbarUser: React.FC = () => {
  const { logOutUser, userAuth } = useUserContext();
  const { closeModal } = useGlobalContext();
  const history = useNavigate();

  const handleLogout = () => {
    logOutUser();
    closeModal();
  };

  const search = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (search.current?.value.length) {
      try {
        const response = await axios.get(
          'https://noodles-api.herokuapp.com/api/v1/search/?query=' +
            search.current.value
        );
        const data = {
          result: response.data,
          query: search.current.value,
        };
        if (response.data.length) {
          history('/search', { state: data });
        } else {
          alert('No results found');
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (!userAuth) {
      history('/');
    }
  }, [userAuth]);

  return (
    <Wrapper>
      <form onSubmit={handleSearch}>
        <input type='text' ref={search} />
      </form>
      <FaBars />
      <NavLink to={'/'} className='logo'>
        Noodle It!
      </NavLink>
      <div className='nav-items'>
        <button onClick={() => handleLogout()}>Logout</button>
        <NavLink to={'/dashboard'}>Profile</NavLink>
        <ToogleTheme />
        <Link to={'/cart'}>
          <FaShoppingCart />
        </Link>
      </div>
    </Wrapper>
  );
};
export default NavbarUser;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-items {
    display: flex;
  }

  @media screen and (min-width: 768px) {
    .nav-items {
      display: flex;
    }
  }
`;
