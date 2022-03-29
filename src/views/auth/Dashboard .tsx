import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext, userAuth } from '../../Context';
import { useNavigate } from 'react-router-dom';

type Props = {
  // user: any;
};

const Dashboard: React.FC<Props> = ({}) => {
  const { userAuth, user, setUser } = useGlobalContext();

  const history = useNavigate();

  const getuserAuth = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/user/user-details/${userAuth!.user_id}`
    );
    setUser(res.data);
  };
  useEffect(() => {
    if (userAuth !== null) {
      getuserAuth();
    } else {
      history('/login');
    }
  }, [userAuth]);

  return <div>Name{user?.user_name}</div>;
};

export default Dashboard;
