import React, { useEffect, useState } from 'react';
import simplereview from 'simplereview';
import styled from 'styled-components';

import { useUserContext } from '../../context/userContext';

import { Loading, CardSmall } from '../../components';

const Dashboard: React.FC = ({}) => {
  const { user, favoritesNoodles } = useUserContext();
  const [showFav, setShowFav] = useState(false);

  const showFavorites = () => {
    setTimeout(() => {
      // setShowFav(true); // fix
      simplereview(); // fix
    }, 500);
  };
  useEffect(() => {
    showFavorites();
  }, []);

  if (user) {
    return (
      <div className='page-100'>
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
