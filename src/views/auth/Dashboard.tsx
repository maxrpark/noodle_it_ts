import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useGlobalContext, userAuth } from '../../Context';
import { useNavigate } from 'react-router-dom';

type Props = {
  // user: any;
};

const Dashboard: React.FC<Props> = ({}) => {
  const { userAuth, user, getUserDetails, setIsAlreadyLogIn, isAlreadyLogIn } =
    useGlobalContext();

  useEffect(() => {
    if (!isAlreadyLogIn) {
      getUserDetails();
      setIsAlreadyLogIn(true);
    }
  }, [userAuth]);

  return <div>Name{user?.user_name}</div>;
};

export default Dashboard;
