import React from 'react';
import styled from 'styled-components';
type Props = {
  itemName: string;
  itemPrice: string;
  itemAmount: number;
  nameText?: string;
  totalText?: string;
  showText?: boolean;
};

const ItemDetail: React.FC<Props> = ({
  itemName,
  itemAmount,
  itemPrice,
  showText,
}) => {
  return (
    <Wrapper>
      <div className='order-desc'>
        <p className='item'>
          {showText && `Brand:`}
          {itemName}
        </p>
        <p className='item'>
          {showText && `Amount: `} {itemAmount}
        </p>
        <p className='item'>
          {showText && `Price:`} ${itemPrice}
        </p>
        <p className='item'>
          {showText && `Total:`} ${+itemPrice * itemAmount}
        </p>
      </div>
      {!showText && <hr />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .item {
    /* max-width: 140px; */
    word-break: break-word;
  }
`;
export default ItemDetail;
