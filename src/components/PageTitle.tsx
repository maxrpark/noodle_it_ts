import React from 'react';
import styled from 'styled-components';
import noodle_it_img from '../assets/images/noodle_it_img.jpg';

type Props = {
  title: string | undefined;
  image: string | undefined;
};

const PageTitle: React.FC<Props> = ({ title, children, image }) => {
  const style = image
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.2), rgba(117, 19, 93, 0.33)), url(${image})`,
      }
    : {
        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.2), rgba(117, 19, 93, 0.33)), url(${noodle_it_img})`,
      };
  return (
    <Wrapper style={style}>
      <h1>{title}</h1>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 1rem;
  h1 {
    font-size: 3rem;
    color: white;
    padding: 0.5rem 1rem;
    text-transform: capitalize;
  }
  .dsc {
    color: white;
    max-width: 300px;
  }
  @media screen and (min-width: 768px) {
    .dsc {
      color: white;
      max-width: 600px;
    }
  }
`;

export default PageTitle;
