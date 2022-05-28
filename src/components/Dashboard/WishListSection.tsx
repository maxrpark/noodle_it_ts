import React from 'react';
import { Link } from 'react-router-dom';
import { UseToogleList } from '../../customHooks/UseToogleList';
import { useUserContext } from '../../context/userContext';
import {
  CardSmall,
  SectionTitle,
  FallbackMessegeComponent,
} from '../../components';

const WishListSection: React.FC = () => {
  const { user, favoritesNoodles } = useUserContext();
  const { showList, toogleListFunc } = UseToogleList();
  return (
    <>
      <div className='detail-section'>
        <SectionTitle title={'My Wishlist'} urlPath='' />
        {favoritesNoodles.length > 3 && (
          <button type='button' className='link' onClick={() => toogleListFunc}>
            {showList === 3 ? 'Show More' : 'Show Less'}
          </button>
        )}
      </div>
      {favoritesNoodles.length ? (
        <CardSmall user={user} noodles={favoritesNoodles.slice(0, showList)} />
      ) : (
        <FallbackMessegeComponent title='No items in your wishlist yet'>
          <Link className='btn' to={'/products'}>
            See products
          </Link>
        </FallbackMessegeComponent>
      )}
    </>
  );
};

export default WishListSection;
