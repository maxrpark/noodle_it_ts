import React, { useState } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import { useGlobalContext } from '../../context/globalContext';
import { Link } from 'react-router-dom';

type Props = {};

const CartDetails: React.FC = (props: Props) => {
  const {
    total_amount,
    has_discount,
    total_with_discount,
    discount,
    check_coupon,
  } = useCartContext();

  const { user } = useUserContext();
  const { coupon_code, openModal } = useGlobalContext();
  const [inputCode, setInputCode] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputCode.length) {
      if (coupon_code === inputCode && !has_discount) {
        check_coupon(inputCode);
      } else if (coupon_code === inputCode && has_discount) {
        console.log('discount already  in use');
      } else {
        console.log('wrong code');
      }
      setInputCode('');
    } else {
      console.log('enter something');
    }
  };
  return (
    <Wrapper>
      <div className='another-section'>
        <h2>${total_amount}</h2>
        <h3>enter code</h3>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor='coupon'></label>
          <input
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            type='text'
            id='coupon'
          />
        </form>
        {total_with_discount !== total_amount && (
          <h2>
            With {discount}% discount : ${total_with_discount}
          </h2>
        )}
        {user ? (
          <Link to={'/checkout'}>Check Out</Link>
        ) : (
          <button onClick={() => openModal()}>LogIng</button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .another-section {
    background-color: red;
    height: 300px;
  }
`;

export default CartDetails;
