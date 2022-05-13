import React from 'react';
import styled from 'styled-components';
// import { FaPlus, FaMinus } from 'react-icons/fa';
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
type Props = {
  increase: () => void;
  decrease: () => void;
  amount: number;
};

const AmountButtons: React.FC<Props> = ({ increase, decrease, amount }) => {
  return (
    <Wrapper className='amount-btns'>
      <button type='button' className='amount-btn' onClick={increase}>
        <MdOutlineKeyboardArrowUp />
      </button>
      <h2 className='amount'>{amount}</h2>
      <button type='button' className='amount-btn' onClick={decrease}>
        <MdOutlineKeyboardArrowDown />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin: 1rem;
  @media screen and (min-width: 960px) {
    flex-direction: row;
    gap: 2rem;
  }
  h2 {
    margin-bottom: 0;
  }
  button {
    background: none;
    border: none;
    font-size: 1.25rem;
  }
`;

export default AmountButtons;
