import React from 'react';
import { ItemDetail, TotalDetail } from '../components/index';
import { CartContent } from '../ts/interfaces/global_interfaces';
import styled from 'styled-components';
type Props = {
  cart: CartContent[];
  total_amount?: string | number;
  total_with_discount?: number;
  discount: number;
};

const OrderDetailsComponent: React.FC<Props> = ({
  cart,
  total_amount,
  total_with_discount,
  discount,
}) => {
  return (
    <Wrapper>
      <div className='header'>
        <h4 className='item'>name</h4>
        <h4 className='item'>amount</h4>
        <h4 className='item'>price</h4>
        <h4 className='item'>total</h4>
      </div>
      <hr />
      <div className='items-order-container'>
        {cart.map((item: CartContent) => {
          const { name, price, amount, id } = item;
          return (
            <ItemDetail
              key={id}
              itemName={name}
              itemPrice={price}
              itemAmount={amount}
            />
          );
        })}
      </div>
      <TotalDetail
        total_with_discount={total_with_discount}
        total_amount={total_amount}
        discount={discount}
      />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 1rem;
  .items-order-container {
    margin: 1rem 0;
  }
  .header,
  .order-desc {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    gap: 0.3rem;
    @media screen and (max-width: 960px) {
      grid-template-columns: 1fr 80px 60px 60px;
    }
  }
  hr {
    margin: 0.5rem 0 1rem 0;
  }
  .header .item:not(:first-child),
  .order-desc .item:not(:first-child) {
    text-align: center;
  }

  .header .item:last-child,
  .order-desc .item:last-child {
    text-align: end;
  }
  .total-desc {
    display: flex;
    justify-content: space-between;
  }
  .with-descount {
    text-decoration: line-through;
  }
  .header h4 {
    text-transform: capitalize;
  }
  .total {
    color: var(--special-color-1);
  }
`;
export default OrderDetailsComponent;
