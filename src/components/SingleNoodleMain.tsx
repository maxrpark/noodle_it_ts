import React from 'react';
import { Link } from 'react-router-dom';
import { NoodleDetails } from '../Context';
import styled from 'styled-components';

// Component
import NoodleTopSection from '../components/NoodleTopSection';
import NoodleInfo from '../components/NoodleInfo';
import Carrousel from '../components/Carrousel';
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
            <div className='tags-container'>
              <h3>Tags: </h3>
              {noodle.tags.map((tag: string) => {
                return (
                  <Link to={`/tags/${tag}`} className='tag' key={tag}>
                    #{tag}
                  </Link>
                );
              })}
            </div>
          </div>
          <NoodleInfo noodle={noodle} />
        </div>
        <div className='instructions'>
          <h3>Instructions</h3>
          <p>{noodle.instructions}</p>
        </div>
        <Link to='/'>
          <button className='back'>Back</button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default SingleNoodleMain;
const Wrapper = styled.div`
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
`;
