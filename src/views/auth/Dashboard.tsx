import React, { useEffect, useState } from 'react';
import simplereview from 'simplereview';
import styled from 'styled-components';

import { useUserContext } from '../../context/userContext';

import { Loading, CardSmall } from '../../components';

const Dashboard: React.FC = ({}) => {
  const { user, favoritesNoodles } = useUserContext();

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
      <div className='section-center page-100'>
        <Wrapper>
          <h2>Welcome, {user.user_name}</h2>
          <CardSmall user={user} noodles={favoritesNoodles} />
        </Wrapper>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Dashboard;

const Wrapper = styled.div``;
