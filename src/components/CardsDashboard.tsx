import React from 'react';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { NoodleDetails } from '../context/globalContext';
import { userDetails } from '../context/userContext';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

type Props = {
  user: userDetails;
  favoritesNoodles: NoodleDetails[];
};
const CardSmall: React.FC<Props> = ({ user, favoritesNoodles }) => {
  const { isFavoriteNoodle, setUserFavoriteList } = useUserContext();
  return (
    <Wrapper>
      <div className='favorites-noodles'>
        {favoritesNoodles.map((noodle: NoodleDetails) => {
          return (
            <>
              <div className='single-noodle' key={noodle.id}>
                <Link to={`/noodle/${noodle.slug}`}>
                  <img
                    className='img'
                    src={noodle.images[0]}
                    alt={noodle.name}
                  />
                </Link>
                <div className='info'>
                  <p>{noodle.name}</p>
                  <span
                    className='heart'
                    onClick={() => setUserFavoriteList(user.user_name, noodle)}
                  >
                    {isFavoriteNoodle ? (
                      <AiFillHeart className='heart fill' />
                    ) : (
                      <AiOutlineHeart className='heart empty' />
                    )}
                  </span>
                </div>
              </div>
            </>
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
  }
  /* single noodle */
  .single-noodle {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 0.5px solid #ccc;
    background: var(--color-primary);
  }
  img {
    height: 150px;
    object-fit: cover;
    justify-self: flex-start;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    position: relative;
  }
`;
