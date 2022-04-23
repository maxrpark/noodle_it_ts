import React from 'react';
import styled from 'styled-components';

import noodle_it_img from '../assets/media/noodle_it_img.jpg';

type Props = {};

const HomeHero: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper>
      <h1>Just, Noodle it!</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 70vh;
  width: 100%;
  background: url(${noodle_it_img}) center/cover no-repeat;
  display: grid;
  place-content: center;

  h1 {
    font-size: 10vw;
    color: white;
    background: rgba(220, 20, 60, 0.8);
    padding: 0.5rem 1rem;
  }
`;

export default HomeHero;
