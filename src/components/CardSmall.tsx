import React from 'react';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { NoodleDetails } from '../context/globalContext';
import { userDetails } from '../context/userContext';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

type Props = {
  user: userDetails | null;
  noodles: NoodleDetails[];
};
const CardSmall: React.FC<Props> = ({ user, noodles }) => {
  const { setUserFavoriteList } = useUserContext();
  return (
    <Wrapper>
      <div className='favorites-noodles'>
        {noodles.map((noodle: NoodleDetails) => {
          return (
            <div className='single-card' key={noodle.id}>
              <Link className='card-link' to={`/noodle/${noodle.slug}`}>
                {noodle.images && (
                  <img
                    className='card-img'
                    src={noodle.images[0]}
                    alt={noodle.name}
                  />
                )}
              </Link>

              <div className='info'>
                <p>{noodle.name}</p>
                {!user ? (
                  <p>{noodle.price_per_package}</p>
                ) : (
                  <span
                    className='heart'
                    onClick={() => setUserFavoriteList(user.user_name, noodle)}
                  >
                    <AiFillHeart className='heart fill' />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default CardSmall;

const Wrapper = styled.div`
  /* favorites-noodles */
  .favorites-noodles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .card-link {
    max-height: 150px;
  }
  .info {
    justify-content: space-between;
  }
`;
