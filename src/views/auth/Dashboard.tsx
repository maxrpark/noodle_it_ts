import React, { useEffect, useState } from 'react';

import { useUserContext } from '../../context/userContext';

type Props = {
  // user: any;
};

const Dashboard: React.FC<Props> = ({}) => {
  const { user } = useUserContext();

  return <div>Name{user?.user_name}</div>;
};

export default Dashboard;
