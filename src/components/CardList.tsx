import React from 'react';
import { List } from '../context/productsContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const image =
  'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/veg-noodles-vegetable-noodles-recipe.jpg';

type Props = {
  noodles: List[];
  type: string | undefined;
  layout?: string;
};

const CardList: React.FC<Props> = ({ noodles, type, layout }) => {
  return (
    <Wrapper className={`cards-layout ${layout && layout}`}>
      {noodles.map((noodle, idx) => {
        return (
          <Link
            className={`single-card card-${idx}`}
            key={noodle.id}
            to={`/noodles/${type}/${noodle.slug}`}
          >
            <img
              className='card-img'
              src={noodle.image ? noodle.image : image}
              alt={noodle.name}
            />
            <div className='info'>
              <div className='bottom__details'>
                <p>{noodle.name}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // move styles to theme file
`;

export default CardList;
