import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SingleOrder from '../SingleOrder';
import SectionTitle from '../SectionTitle';
import FallbackMessegeComponent from '../FallbackMessegeComponent';
import { UseToogleList } from '../../customHooks/UseToogleList';
import { userDetails } from '../../ts/interfaces/global_interfaces';
const url = 'https://noodles-api.herokuapp.com/api/users/user-orders/';

type Props = {
  user: userDetails;
};

const OrderSection: React.FC<Props> = ({ user }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showList, toogleListFunc } = UseToogleList();

  useEffect(() => {
    fetch(url + user.user_name)
      .then((res) => res.json())
      .then((data) => {
        setOrderDetails(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [user]);

  if (isLoading) {
    return <FallbackMessegeComponent title='Loading' />;
  }

  return (
    <Wrapper>
      <div className='detail-section'>
        <SectionTitle title={'All my Orders'} urlPath='' />
        {orderDetails.length > 3 && (
          <button className='link' onClick={toogleListFunc}>
            {showList === 3 ? 'Show More' : 'Show Less'}
          </button>
        )}
      </div>
      {orderDetails.length ? (
        <section className='details-wrapper'>
          <div className='details'>
            <p>Date</p>
            <p className='order-date'>Total</p>
            <p className='see-order top'>Details</p>
          </div>
          <hr />
          {orderDetails
            .map((order: any) => {
              return <SingleOrder key={order.id} order={order} />;
            })
            .slice(0, showList)}
        </section>
      ) : (
        <FallbackMessegeComponent title="Your don't have any other yet">
          <Link to={'/products'}>See products</Link>
        </FallbackMessegeComponent>
      )}
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
  .top {
    color: black;
  }
`;

export default OrderSection;
