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
    <Wrapper className='cards-layout'>
      {noodles.map((noodle: NoodleDetails) => {
        return (
          <div className='single-card' key={noodle.id}>
            <Link className='card-link' to={`/noodle/${noodle.slug}`}>
              <div className='top'>
                <p>{noodle.name}</p>
              </div>
              {noodle.images && (
                <img
                  className='card-img'
                  src={noodle.images[0]}
                  alt={noodle.name}
                />
              )}
            </Link>

            <div className='bottom'>
              <div className='bottom__details'>
                <p className={`special-link ${noodle.category}`}>
                  {noodle.category}
                </p>
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
          </div>
        );
      })}
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
    /* max-height: 150px; */
    display: flex;
    flex-direction: column;
  }
  .info {
    justify-content: space-around;
    font-size: 12px;
  }

  .top {
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
    text-transform: capitalize;
    font-size: 14px;
  }

  .bottom {
    height: 100%;
    padding: 0.5rem;
    &__details {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
