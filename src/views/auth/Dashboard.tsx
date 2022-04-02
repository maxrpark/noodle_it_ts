import React, { useEffect, useState } from 'react';
import simplereview from 'simplereview';

import { useUserContext } from '../../context/userContext';

import { Card } from '../../components';
import { NoodleDetails } from '../../context/globalContext';
type Props = {
  // user: any;
};

const Dashboard: React.FC<Props> = ({}) => {
  const { user, favoritesNoodles } = useUserContext();
  const [showFav, setShowFav] = useState(false);

  const showFavorites = () => {
    setTimeout(() => {
      setShowFav(true); // fix
      simplereview(); // fix
    }, 100);
  };
  useEffect(() => {
    showFavorites();
  }, []);

  if (user) {
    return (
      <>
        <div>Name{user?.user_name}</div>
        {showFav &&
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
