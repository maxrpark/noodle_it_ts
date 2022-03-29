import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext, UserDetails } from '../../Context';
import { useNavigate } from 'react-router-dom';

type Props = {
  // user: any;
};

const Profile: React.FC<Props> = ({}) => {
  const { userDetails } = useGlobalContext();
  const [user, setUser] = useState({} as UserDetails);
  const history = useNavigate();
  const getUserDetails = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/user/user-details/${userDetails!.user_id}`
    );
    setUser(res.data);
  };
  useEffect(() => {
    if (userDetails !== null) {
      getUserDetails();
    } else {
      history('/login');
    }
  }, [userDetails]);

  return <div>Name{user?.user_name}</div>;
};

export default Profile;
