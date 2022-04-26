import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';
import { AmountButtons } from '../components';
import { FaTrash } from 'react-icons/fa';

interface Props {
  cart: any;
}

interface CartContent {
  id: string;
  image: string;
  name: string;
  price: string;
  amount: string;
}

const CartContent: React.FC<Props> = ({ cart }) => {
  const { removeItem, toggleAmount } = useCartContext();

  // const increase = (id) => {
  //   toggleAmount(id, 'inc');
  // };
  // const decrease = () => {
  //   toggleAmount(id, 'dec');
  // };
  return (
    <Wrapper>
      {cart.map((item: CartContent) => {
        return (
          <div key={item.id} className='single-item'>
            <img src={item.image} alt='' />
            <p>{item.name}</p>
            <p>{item.amount}</p>
            <AmountButtons
              amount={+item.amount}
              increase={() => toggleAmount(item.id, 'inc')}
              decrease={() => toggleAmount(item.id, 'dec')}
            />
            {/* <h5 className='subtotal'>{formatPrice(price * amount)}</h5> */}
            <button
              type='button'
              className='remove-btn'
              onClick={() => removeItem(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    /* width: 100%; */
    height: 200px;
  }
`;

export default CartContent;
