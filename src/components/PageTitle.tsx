import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string | undefined;
  image: string | undefined;
};

const PageTitle: React.FC<Props> = ({ title, children, image }) => {
  const style = image
    ? { backgroundImage: `url(${image})` }
    : { backgroundColor: '#f5f5f5' };
  return (
    <Wrapper style={style}>
      <h1>{title}</h1>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  height: 200px;
  background: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    /* display: none; */
  }
`;

export default PageTitle;
