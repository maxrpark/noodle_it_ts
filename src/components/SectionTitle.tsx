import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  urlPath: string;
};

const SectionTitle: React.FC<Props> = ({ title }) => {
  return (
    <Wrapper className='container'>
      <h2>{title}</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .title {
    font-size: 1.5rem;
    margin: 0.5rem 1rem;
  }
`;

export default SectionTitle;
