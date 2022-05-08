import { useState, useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';
import { PageTitle, OrderDetailsComponent } from '../components/index';
import { CartContent } from '../ts/interfaces/global_interfaces';
const url = 'https://noodles-api.herokuapp.com/api/users/user-order/';

interface OrderDetails {
  id: number;
  cart_items: CartContent[];
  created_at: string;
  discount: string;
  paid_amount: string;
  total_amount_without_discount: string;
}

const OrderDetails: React.FC = () => {
  const { user } = useUserContext();
  const [orderDetails, setOrderDetails] = useState({} as OrderDetails);
  const { id } = useParams();

  useEffect(() => {
    if (user && !orderDetails.cart_items) {
      fetch(url + user.user_name + '/' + id)
        .then((res) => res.json())
        .then((data) => {
          setOrderDetails(data);
          console.log(data);
        });
    }
  }, [user]);

  return (
    <div>
      <PageTitle title={'Your Order'} image={''} />
      <div className='section-center page-100'>
        {orderDetails.cart_items && (
          <OrderDetailsComponent
            cart={orderDetails.cart_items}
            total_amount={orderDetails.total_amount_without_discount}
            total_with_discount={+orderDetails.paid_amount}
            discount={+orderDetails.discount}
          />
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
