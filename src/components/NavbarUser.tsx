import { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { ToogleTheme } from '../components';
import { FaShoppingCart } from 'react-icons/fa';

import styled from 'styled-components';

import { FaBars } from 'react-icons/fa';
import axios from 'axios';
const NavbarUser: React.FC = () => {
  const { logOutUser, userAuth } = useUserContext();
  const history = useNavigate();

  const search = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (search.current?.value.length) {
      console.log(search.current.value);
      try {
        const response = await axios.get(
          'https://noodles-api.herokuapp.com/api/v1/search/?query=' +
            search.current.value
        );
        console.log(response.data);
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
        <button onClick={logOutUser}>Logout</button>
        <NavLink to={'/dashboard'}>Profile</NavLink>
        <ToogleTheme />
        <FaShoppingCart />
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
