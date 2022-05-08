import React from 'react';

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
    <section>
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
    </section>
  );
};

export default ItemDetail;
