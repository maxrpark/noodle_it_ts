import React, { useEffect } from 'react';
import simplereview from 'simplereview';

import { useUserContext } from '../../context/userContext';

import { Card } from '../../components';
import { NoodleDetails } from '../../context/globalContext';
type Props = {
  // user: any;
};

const Dashboard: React.FC<Props> = ({}) => {
  const { user, favoritesNoodles } = useUserContext();

  console.log(favoritesNoodles);

  useEffect(() => {
    if (favoritesNoodles && favoritesNoodles.length) {
      simplereview(); // fix
    }
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
