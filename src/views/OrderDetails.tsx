import { useState, useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  PageTitle,
  OrderDetailsComponent,
  OrderSection,
  SectionTitle,
} from '../components/index';
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

interface Options {
  weekday: any;
  year: any;
  month: any;
  day: any;
}
var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as Options;

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

  let orderDate = new Date(orderDetails.created_at).toLocaleDateString(
    'en-US',
    options
  );
  return (
    <Wrapper>
      <PageTitle title={`${orderDate}`} image={''} />
      <div className='section-center page-100'>
        <SectionTitle
          title={`Order details`}
          urlPath='dashboard'
          text={'Dashboard'}
        />
        {orderDetails.cart_items && (
          <OrderDetailsComponent
            cart={orderDetails.cart_items}
            total_amount={orderDetails.total_amount_without_discount}
            total_with_discount={+orderDetails.paid_amount}
            discount={+orderDetails.discount}
          />
        )}
        {user && <OrderSection user={user} />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  a {
    font-size: 13px;
    margin: 0;
    text-decoration: none;
  }
`;

export default OrderDetails;
