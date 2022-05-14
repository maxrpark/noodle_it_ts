import React from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../customHooks/UsePageTitle';
import styled from 'styled-components';

const Error: React.FC = () => {
  usePageTitle('Ups!'); // page title hook
  return (
    <Wrapper className=''>
      <div className='page-100-without-title center'>
        <h2 className='error-page'>
          Ups! <br /> Nothing here
        </h2>
        <Link className='btn' to='/'>
          Go to home
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  h2 {
    text-align: center;
    margin: 1rem;
  }
`;
