import React, { useEffect, useState } from 'react';
import simplereview from 'simplereview';
import styled from 'styled-components';
import { UseToogleList } from '../../customHooks/UseToogleList';
import { useCartContext } from '../../context/cartContext';

import { useUserContext } from '../../context/userContext';
import {
  Loading,
  CardSmall,
  SectionTitle,
  PageTitle,
  OrderSection,
  CartContent,
} from '../../components';

const Dashboard: React.FC = ({}) => {
  const { user, favoritesNoodles } = useUserContext();
  const { cart } = useCartContext();
  const { showList, toogleListFunc } = UseToogleList();

  const showFavorites = () => {
    setTimeout(() => {
      simplereview(); // fix
    }, 500);
  };
  useEffect(() => {
    showFavorites();
  }, []);

  if (user) {
    return (
      <Wrapper>
        <PageTitle title={'DashBoard'} image={''}></PageTitle>
        <div className='section-center page-100'>
          <h2>Welcome, {user.user_name}</h2>
          <SectionTitle title={'My Cart'} urlPath='Cart' text='Go Cart' />
          <CartContent cart={cart} />;
          <OrderSection user={user} />
          <div className='favSection'>
            <SectionTitle title={'My Favorites'} urlPath='' />
            {favoritesNoodles.length > 3 && (
              <button className='link' onClick={toogleListFunc}>
                {showList === 3 ? 'Show More' : 'Show Less'}
              </button>
            )}
          </div>
          <CardSmall
            user={user}
            noodles={favoritesNoodles.slice(0, showList)}
          />
        </div>
      </Wrapper>
    );
  } else {
    return <Loading />;
  }
};

export default Dashboard;

const Wrapper = styled.main`
  h2 {
    text-align: center;
  }
  .orderImg {
    width: 100px;
  }
  .favSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    margin: 1rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
