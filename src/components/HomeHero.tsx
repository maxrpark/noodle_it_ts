import React from 'react';
import styled from 'styled-components';

import videoHero from '../assets/media/video-hero.mp4';

type Props = {};

const HomeHero: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper>
      <video
        className='hero-video'
        // controls
        autoPlay
        muted
        loop
        src={videoHero}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid red;
  height: 70vh;
  width: 100%;
  position: relative;
  .hero-video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export default HomeHero;
