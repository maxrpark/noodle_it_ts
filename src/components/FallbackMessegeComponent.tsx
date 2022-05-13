import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string | undefined;
};

const FallbackMessegeComponent: React.FC<Props> = ({ title, children }) => {
  return (
    <Wrapper>
      <h4>{title}</h4>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
`;

export default FallbackMessegeComponent;
