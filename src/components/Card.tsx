import React from 'react';
import { Link } from 'react-router-dom';
import { NoodleDetails } from '../context/globalContext';
import styled from 'styled-components';

type Props = {
  noodles: NoodleDetails[];
};

const Card: React.FC<Props> = ({ noodles }) => {
  return (
    <Wrapper className='cards-layout'>
      {noodles.map((noodle: NoodleDetails) => {
        return (
          <Link
            className='single-card'
            key={noodle.id}
            to={`/noodle/${noodle.slug}`}
          >
            <div className='top'>
              <p>{noodle.name}</p>
            </div>
            <img
              className='card-img'
              src={noodle.images[0]}
              alt={noodle.name}
            />
            <div className='bottom'>
              <div className='bottom__details'>
                <p className='rating-container' id={noodle.name}>
                  <span
                    className='simpleReview'
                    resultvalue={noodle.rating}
                    id={noodle.slug}
                  ></span>
                </p>
                <p className={`special-link ${noodle.category}`}>
                  {noodle.category}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  .top {
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
    text-transform: capitalize;
    font-size: 14px;
    p {
      text-align: center;
    }
  }

  .bottom {
    padding: 0.5rem;
    &__details {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .rating-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }
  .simpleReview span {
    display: flex;
  }
`;
