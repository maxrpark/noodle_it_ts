import { useGlobalContext } from '../context/globalContext';
import { useCartContext } from '../context/cartContext';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

const Discount: React.FC = () => {
  const { coupon_code } = useGlobalContext();
  const [showComponent, setShowComponent] = useState(true);

  // TODO GET VALUE FROM STATE
  let discount_value;
  if (coupon_code === 'NOODLE_IT_BUY_NOW') {
    discount_value = 10;
  } else if (coupon_code === 'NOODLE_IT_ON_FIRE') {
    discount_value = 20;
  } else if (coupon_code === 'NOODLE_IT_CRAZY_DAYS') {
    discount_value = 30;
  }
  return (
    <div
      className={`discount-container ${showComponent ? '' : 'hidde-discount'}`}
    >
      <h5 className='discount-text'>
        {discount_value}% off with discount code: {coupon_code}
      </h5>
      <AiOutlineClose onClick={() => setShowComponent(false)} />
    </div>
  );
};

export default Discount;
