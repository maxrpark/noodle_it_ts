import React from 'react';
import styled from 'styled-components';
import { NoodleDetails } from '../../ts/interfaces/global_interfaces';

// Component

import {
  Carrousel,
  NoodleInfo,
  NoodleTopSection,
  AddToCart,
  Tags,
} from '../../components/';

type Props = {
  noodle: NoodleDetails;
};

const SingleNoodleMain: React.FC<Props> = ({ noodle }) => {
  return (
    <Wrapper>
      <div className='section-center'>
        <NoodleTopSection noodle={noodle} />
        <div className='main-section'>
          <div className='section-one'>
            <Carrousel noodle={noodle} />
            <Tags tags={noodle.tags} />
          </div>
          <NoodleInfo noodle={noodle} />
        </div>
        <div className='instructions'>
          <h3 className='noodles-section-title'>Instructions</h3>
          <p>{noodle.instructions}</p>
        </div>
        <hr />
        <AddToCart noodle={noodle} />
      </div>
    </Wrapper>
  );
};

export default SingleNoodleMain;
const Wrapper = styled.div`
  background: ${(props) => props.theme.cardColor};
  box-shadow: var(--box-shadow-1);
  padding: 1rem;
  .section-center {
    max-width: 960px;
  }
  .model-img {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.83);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  .model-img img {
    width: 100%;
    height: 90%;
    padding: 1rem;
    object-fit: contain;
  }

  .instructions {
    max-width: 600px; // fix
    margin-bottom: 1rem;
  }
  .instructions p {
    white-space: pre-line;
    margin: 0.5rem 0;
    padding: 1rem 0;
  }
  /* 
  .description {
    max-width: 300px;
    margin: 1rem auto;
  }
  @media screen and (min-width: 768px) {
    .description {
      max-width: 400px;
    }
  } */
`;
