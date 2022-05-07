import React, { useState } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import { useGlobalContext } from '../../context/globalContext';
import { Link } from 'react-router-dom';
import { toastDangerBottom, toastSuccessBottom } from '../../utils/toast';

const CartDetails: React.FC = () => {
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

  const handleFormSubmit = () => {
    if (inputCode.length) {
      if (coupon_code === inputCode && !has_discount) {
        check_coupon(inputCode);
        toastSuccessBottom('Discount applied!');
      } else if (coupon_code === inputCode && has_discount) {
        toastDangerBottom('Discount already applied');
      } else {
        toastDangerBottom('Wrong code');
      }
      setInputCode('');
    } else {
      toastDangerBottom('Empty code');
    }
  };
  return (
    <Wrapper>
      <div className='details-section'>
        <p>Total</p>
        <h2
          className={`${
            total_with_discount !== total_amount ? 'with-descount' : 'total'
          }`}
        >
          ${total_amount}
        </h2>
        {total_with_discount !== total_amount && (
          <>
            <p>Total with {discount}% discount :</p>
            <h2 className='total'>${total_with_discount}</h2>
          </>
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='coupon'>Enter code</label>

          <div className='code-wrapper'>
            <input
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              type='text'
              id='coupon'
            />
            <button
              type='submit'
              className='coupon-btn'
              onClick={handleFormSubmit}
            >
              Apply
            </button>
          </div>
          {total_with_discount !== total_amount && (
            <small>{coupon_code} is applied</small>
          )}
        </form>
        {user ? (
          <Link className='btn checkout-btn' to={'/checkout'}>
            Check Out
          </Link>
        ) : (
          <button onClick={() => openModal()}>LogIng</button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: white;
  padding: 1rem;
  height: 240px;
  min-height: 335px;
  .details-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .total {
    color: var(--special-color-1);
  }

  .with-descount {
    text-decoration: line-through;
  }
  .checkout-btn {
    margin-top: 0.5rem;
    border-radius: 0;
  }
  .code-wrapper {
    display: flex;
    height: 30px;
    margin-top: 0.5em;
  }
  input {
    width: 200px;
  }
  .coupon-btn {
    background: var(--btn-color);
    border: none;
    color: #ffffff;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }
  @media screen and (min-width: 960px) {
    .details-section {
      position: sticky;
      top: 0;
    }
  }
`;

export default CartDetails;
