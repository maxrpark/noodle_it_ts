import { useState, useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';

const url = 'https://noodles-api.herokuapp.com/api/users/user-order/';

type Props = {};

const OrderDetails = (props: Props) => {
  const { user } = useUserContext();
  const [orderDetails, setOrderDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (user && orderDetails === null) {
      fetch(url + user.user_name + '/' + id)
        .then((res) => res.json())
        .then((data) => {
          setOrderDetails(data);
        });
    }
  }, [user]);

  return <div>OrderDetails</div>;
};

export default OrderDetails;
