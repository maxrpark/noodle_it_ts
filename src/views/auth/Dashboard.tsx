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
  const { user, favoritesNoodles, getUserFavoriteList } = useUserContext();

  useEffect(() => {
    if (favoritesNoodles && favoritesNoodles.length) {
      simplereview(); // fix
    }
    // getUserFavoriteList();
  }, []);

  if (user) {
    return (
      <>
        <div>Name{user?.user_name}</div>
        {favoritesNoodles &&
          favoritesNoodles.map((noodle: NoodleDetails) => {
            return <Card key={noodle.id} noodle={noodle} />;
          })}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Dashboard;
