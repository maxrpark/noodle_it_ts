import React from 'react';
import { Link } from 'react-router-dom';
import { NoodleDetails } from '../Context';
import styled from 'styled-components';

type Props = {
  noodle: NoodleDetails;
};

const Card: React.FC<Props> = ({ noodle }) => {
  return (
    <Wrapper>
      <Link to={`/noodle/${noodle.slug}`}>
        <div className='top'>
          <p>{noodle.name}</p>
        </div>
        <img className='img' src={noodle.images[0]} alt={noodle.name} />
        <div className='bottom'>
          <div className='bottom__details'>
            <p className='rating-container'>
              Rating:
              <span className='simpleReview' resultvalue={noodle.rating}></span>
            </p>
            <p className={`special-link ${noodle.category}`}>
              {noodle.category}
            </p>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  box-shadow: var(--box-shadow-1);
  margin: 1rem;
  border-radius: 5px;
  transition: var(--transition-1);
  :hover {
    box-shadow: var(--box-shadow-2);
    transform: translate(0, -2px);
  }
  .top {
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
    text-transform: capitalize;
  }
  .img {
    height: 200px;
    /* object-fit: contain; */
    object-fit: cover;
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
  a {
    /* text-align: center;
    display: flex;
    justify-content: center;
    align-items: center; */
  }
`;
