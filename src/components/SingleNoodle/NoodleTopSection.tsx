import React from 'react';
import { NoodleDetails } from '../../ts/interfaces/global_interfaces';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useUserContext } from '../../context/userContext';

type Props = {
  noodle: NoodleDetails;
};

const NoodleTopSection: React.FC<Props> = ({ noodle }) => {
  const { user, isFavoriteNoodle, setUserFavoriteList } = useUserContext();

  return (
    <>
      <div className='top'>
        <div className='title'>
          <h2>{noodle.name}</h2>
          {user && isFavoriteNoodle && (
            <div>
              <span onClick={() => setUserFavoriteList(user.user_name, noodle)}>
                {isFavoriteNoodle ? (
                  <AiFillHeart className='heart fill' />
                ) : (
                  <AiOutlineHeart className='heart empty' />
                )}
              </span>
            </div>
          )}
        </div>
        <span
          className='simpleReview'
          resultvalue={noodle.rating}
          id='review'
        ></span>
        <div className='related-links'>
          <Link
            to={`/noodles/categories/${noodle.category}`}
            className={`special-link ${noodle.category}`}
          >
            {noodle.category}
          </Link>
          <Link
            to={`/noodles/brand/${noodle.brand.slug}`}
            className={`special-link ${noodle.brand.name}`}
          >
            {noodle.brand.slug}
          </Link>
        </div>
      </div>
      <div className='description'>
        <h3>Description</h3>
        <p>{noodle.description}</p>
      </div>
    </>
  );
};

export default NoodleTopSection;
