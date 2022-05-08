import React, { useState } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../../context/cartContext';
import { AmountButtons } from '..';
import { FaTrash } from 'react-icons/fa';
import { CartContent } from '../../ts/interfaces/global_interfaces';
import { Link } from 'react-router-dom';
import { BsPlusCircleFill, BsFillDashCircleFill } from 'react-icons/bs';
import { ItemDetail } from '../index';

interface Props {
  item: CartContent;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const { removeItem, toggleAmount } = useCartContext();
  const [toogleShowSection, setToogleShowSection] = useState(false);

  const toogleSection = () => {
    setToogleShowSection(!toogleShowSection);
  };

  return (
    <Wrapper key={item.id}>
      <div className='single-item'>
        <Link to={`/noodle/${item.slug}`}>
          <img src={item.image} alt='' />
        </Link>
        <div className='item-descriptions'>
          <p className='name'>{item.name}</p>
          <div className='item-details'>
            {/* <span className='detail'>{item.brand}</span>
            <span className='point'>&bull; </span> */}
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
          <button
            type='button'
            className='remove-btn'
            onClick={() => removeItem(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className='detail-wrapper'>
        <div className='detail-title'>
          <h4>Product Details</h4>
          <span onClick={toogleSection}>
            {!toogleShowSection ? (
              <BsPlusCircleFill />
            ) : (
              <BsFillDashCircleFill />
            )}
          </span>
        </div>
        <div
          className={`amount-details ${!toogleShowSection && 'toogle-details'}`}
        >
          <ItemDetail
            itemName={item.brand}
            itemPrice={item.price}
            itemAmount={item.amount}
            showText={true}
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  overflow: hidden;
  .single-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    background-color: white;
    padding: 0.5rem;
  }

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
  .remove-btn {
    border: none;
    background: transparent;
    margin-left: 1rem;
  }
  .detail-wrapper {
    overflow: hidden;
    margin: 0.5rem;
  }
  .detail-title {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .amount-details {
    height: 100px;
    transition: all 0.3s linear;
  }
  .toogle-details {
    height: 0;
  }
`;

export default CartItem;
