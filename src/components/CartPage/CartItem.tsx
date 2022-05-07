import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../../context/cartContext';
import { AmountButtons } from '..';
import { FaTrash } from 'react-icons/fa';
import { CartContent } from '../../ts/interfaces/global_interfaces';
import { Link } from 'react-router-dom';

interface Props {
  item: CartContent;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const { removeItem, toggleAmount } = useCartContext();
  return (
    <Wrapper key={item.id} className='single-item'>
      <Link to={`/noodle/${item.slug}`}>
        <img src={item.image} alt='' />
      </Link>
      <div className='item-descriptions'>
        <p className='name'>{item.name}</p>
        <div className='item-details'>
          <span className='detail'>{item.brand}</span>
          <span className='point'>&bull; </span>
          <span className='detail'>Rating: {item.rating}/5</span>
          <span className='point'>&bull; </span>
          <span className='detail'>{item.category}</span>
        </div>
      </div>
      <div className='items-button'>
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

      <div className='amount-details'>
        <div className='detail'>Price:{item.price} </div>
        <div className='detail'>Amount:{item.amount} </div>
        SubTotal : {+item.price * item.amount}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background-color: white;
  padding: 0.5rem;

  img {
    /* width: 100%; */
    height: 100px;
  }

  .items-button {
    display: flex;
    justify-self: flex-start;
  }
  .item-descriptions {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 1rem;
  }
  .item-details {
    position: absolute;
    bottom: 0;
    span {
      text-transform: capitalize;
    }
    .detail {
      margin-right: 0.5rem;
      font-size: 12px;
      align-self: end;
      justify-self: end;
    }
    .point {
      color: red;
    }
  }
`;

export default CartItem;
