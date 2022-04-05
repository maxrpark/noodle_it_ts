import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Error: React.FC = () => {
  return (
    <Wrapper>
      <div className='page-100'>
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
