import React from 'react';
import { List } from '../context/productsContext';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

const image =
  'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/veg-noodles-vegetable-noodles-recipe.jpg';

type Props = {
  noodles: List[];
  type: string;
};

const CardList: React.FC<Props> = ({ noodles, type }) => {
  return (
    <>
      <Wrapper className='container'>
        {noodles.map((noodle) => {
          return (
            <Link key={noodle.id} to={`${type}/${noodle.name}`}>
              <div className='top'>
                <p>{noodle.name}</p>
              </div>
              {/* <img className='img' src={''} alt={noodle.name} /> */}
              <img
                className='img'
                src={noodle.image ? noodle.image : image}
                alt={noodle.name}
              />
              <div className='bottom'>
                <div className='bottom__details'></div>
              </div>
            </Link>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  a {
    width: 100%;
    max-width: 400px;
    box-shadow: var(--box-shadow-1);
    border-radius: 5px;
    transition: var(--transition-1);
    background: ${(props) => props.theme.cardColor};
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    :hover {
      box-shadow: var(--box-shadow-2);
      transform: translate(0, -2px);
    }
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
`;

export default CardList;
