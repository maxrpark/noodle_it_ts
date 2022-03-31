import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useGlobalContext, NoodleDetails } from '../context/globalContext';
import { useFetch } from '../customHooks/useFetch';
type Props = {
  noodle: NoodleDetails;
};

const Carrousel: React.FC<Props> = ({ noodle }) => {
  const { showImage, closeModal, selectedImg, isModalOpen } =
    useGlobalContext();

  return (
    <>
      <section className='sliderContainer'>
        {noodle.images.map((image: string) => {
          return (
            <div className='slide' key={image}>
              <img
                onClick={showImage}
                className='img'
                src={image}
                alt={noodle.name}
              />
              ;
            </div>
          );
        })}
      </section>
      {isModalOpen && (
        <ModalContainer>
          <div onClick={closeModal} className='model-img'>
            <img src={selectedImg} alt={noodle.name} />
          </div>
        </ModalContainer>
      )}
    </>
  );
};

export default Carrousel;
const ModalContainer = styled.div`
  .model-img {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    /* background: white; */
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
