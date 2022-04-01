import React, { useState, useEffect } from 'react';
import simplereview from 'simplereview';

import { useUserContext } from '../../context/userContext';
import { useProductsContext } from '../../context/productsContext';

import { Card } from '../../components';
import { NoodleDetails } from '../../context/globalContext';
type Props = {
  // user: any;
};

const Dashboard: React.FC<Props> = ({}) => {
  const { user } = useUserContext();
  const { noodles } = useProductsContext();
  const [userFavorites, setUserFavorites] = useState([] as NoodleDetails[]);

  const getUserFavoriteList = () => {
    if (user && user.favorites) {
      const favoritesList = noodles.filter((elem) => {
        return user?.favorites.find(({ slug }) => elem.slug === slug);
      });
      setUserFavorites(favoritesList);
    }
  };

  useEffect(() => {
    getUserFavoriteList();
  }, [noodles]);

  useEffect(() => {
    if (userFavorites.length) {
      simplereview();
    }
  }, [userFavorites]);

  if (user) {
    return (
      <>
        <div>Name{user?.user_name}</div>
        {userFavorites &&
          userFavorites.map((noodle: NoodleDetails) => {
            return <Card key={noodle.id} noodle={noodle} />;
          })}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Dashboard;
