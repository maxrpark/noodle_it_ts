import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  urlPath: string;
};

const SectionTitle: React.FC<Props> = ({ title, urlPath }) => {
  return (
    <Wrapper>
      <h2 className=''>{title}</h2>
      {urlPath && (
        <Link className='link' to={`/${urlPath}`}>
          see more
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;
  h2 {
    font-size: 1.5rem;
  }
  a {
    text-transform: capitalize;
    text-decoration: underline;
  }
`;

export default SectionTitle;
