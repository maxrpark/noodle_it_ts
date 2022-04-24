import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { AmountButtons}
import { AmountButtons } from '../../components/';
import { Link } from 'react-router-dom';

type Props = {};

const AddToCart: React.FC<Props> = ({}) => {
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  return (
    <Wrapper>
      <div className='btn-container'>
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link to='/cart' className='btn'>
          {/* onClick={() => addToCart(id, mainColor, amount, product)} */}
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default AddToCart;
