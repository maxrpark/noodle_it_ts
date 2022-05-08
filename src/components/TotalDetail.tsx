import React from 'react';
type Props = {
  total_amount?: string | number;
  total_with_discount?: number;
  discount: number;
};

const TotalDetail: React.FC<Props> = ({
  total_with_discount,
  total_amount,
  discount,
}) => {
  return (
    <>
      {total_with_discount && total_with_discount != total_amount ? (
        <>
          <h4 className='total-desc'>
            Total without discount:{' '}
            <span className='with-descount'>${total_amount}</span>
          </h4>
          <h2 className='total-desc total'>
            Total with {discount.toFixed()}% discount:{' '}
            <span>${total_with_discount}</span>
          </h2>
        </>
      ) : (
        <h2 className='total-desc total'>
          Total: <span>${total_amount}</span>
        </h2>
      )}
    </>
  );
};

export default TotalDetail;
