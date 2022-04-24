import React, { useEffect, useState } from 'react';
import simplereview from 'simplereview';
import styled from 'styled-components';

import { useUserContext } from '../../context/userContext';
import { Loading, CardSmall, SectionTitle, PageTitle } from '../../components';

const Dashboard: React.FC = ({}) => {
  const { user, favoritesNoodles } = useUserContext();
  const [showMoreFav, setShowMoreFav] = useState(3);

  const toogleFavList = () => {
    if (showMoreFav === 3) {
      setShowMoreFav(favoritesNoodles.length);
    } else {
      setShowMoreFav(3);
    }
  };

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
          <div className='favSection'>
            <SectionTitle title={'My Favorites'} urlPath='' />

            <button className='link' onClick={toogleFavList}>
              {showMoreFav === 3 ? 'Show More' : 'Show Less'}
            </button>
          </div>
          <CardSmall
            user={user}
            noodles={favoritesNoodles.slice(0, showMoreFav)}
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
