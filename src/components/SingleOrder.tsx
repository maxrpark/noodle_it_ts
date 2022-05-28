import React from 'react';
import { Link } from 'react-router-dom';
import {
  OrderInterface,
  DateOptions,
} from '../ts/interfaces/global_interfaces';
import styled from 'styled-components';

type Props = {
  order: OrderInterface;
};

let options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
} as DateOptions;

const SingleOrder: React.FC<Props> = ({ order }) => {
  return (
    <Wrapper>
      <p>{new Date(order.created_at).toLocaleDateString('en-US', options)}</p>
      <p className='order-date'>${order.paid_amount}</p>
      <Link
        to={`/order-details/${order.id}`}
        className='see-order'
        style={{ textDecoration: 'none' }}
      >
        See order
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
export default SingleOrder;
