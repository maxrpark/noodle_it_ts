import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../../context/cartContext';
import { NoodleDetails } from '../../context/globalContext';
import { AmountButtons } from '../../components/';
import { Link } from 'react-router-dom';

type Props = {
  noodle: NoodleDetails;
};

const AddToCart: React.FC<Props> = ({ noodle }) => {
  const [amount, setAmount] = useState(1);
  const { addToCartFunc } = useCartContext();
  const { id } = noodle;

  // const addToCartFunc = (id: any, name: any) => {
  //   console.log('add to cart');
  //   console.log(id);
  //   console.log(name);
  // };

  // useEffect
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
        <button
          className='btn'
          onClick={() => addToCartFunc(id, noodle, amount)}
        >
          Add to cart
        </button>
        {/* <Link to={'#'} className='btn' onClick={() => addToCartFunc(id, name)}>
          add to cart
        </Link> */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default AddToCart;
