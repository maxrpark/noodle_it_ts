import React, { useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext, UserDetails } from '../../Context';

type Props = {
  // user: any;
};

const Profile: React.FC<Props> = ({}) => {
  const { userDetails } = useGlobalContext();

  return <div>Name{userDetails?.first_name}</div>;
};

export default Profile;
