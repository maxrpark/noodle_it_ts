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
            <div className='single-noodle' key={noodle.id}>
              <Link to={`/noodle/${noodle.slug}`}>
                {noodle.images && (
                  <img
                    className='img'
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
  /* single noodle */
  .single-noodle {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--color-primary);
    overflow: hidden;
    transition: var(--transition-1);
    border-radius: 5px;

    :hover {
      transform: scale(1.04);
      /* img {
        filter: contrast(0.5);
      } */
    }
  }

  img {
    height: 150px;
    object-fit: cover;
    justify-self: flex-start;
    transition: var(--transition-1);
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    position: relative;
  }
`;
