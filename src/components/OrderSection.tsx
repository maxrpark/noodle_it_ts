import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SingleOrder from './SingleOrder';
import SectionTitle from './SectionTitle';
import { UseToogleList } from '../customHooks/UseToogleList';

const url = 'https://noodles-api.herokuapp.com/api/users/user-orders/';

type Props = {
  user: any;
};

const OrderSection: React.FC<Props> = ({ user }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const { showList, toogleListFunc } = UseToogleList();

  useEffect(() => {
    fetch(url + user.user_name)
      .then((res) => res.json())
      .then((data) => {
        setOrderDetails(data);
      });
  }, [user]);

  return (
    <Wrapper>
      <div className='favSection'>
        <SectionTitle title={'My Orders'} urlPath='' />
        {orderDetails.length > 3 && (
          <button className='link' onClick={toogleListFunc}>
            {showList === 3 ? 'Show More' : 'Show Less'}
          </button>
        )}
      </div>
      <section className='details-wrapper'>
        <div className='details'>
          <p>Date</p>
          <p className='order-date'>Total</p>
          <p className='see-order'>Details</p>
        </div>
        <hr />
        {orderDetails
          .map((order: any) => {
            return <SingleOrder key={order.id} order={order} />;
          })
          .slice(0, showList)}
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: '1rem';
  .details-wrapper {
    padding: 1rem;
  }
  .details {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default OrderSection;
