import React, { useEffect } from 'react';
import simplereview from 'simplereview';
import styled from 'styled-components';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import {
  Loading,
  PageTitle,
  OrderSection,
  WishListSection,
  CartSection,
} from '../../components';

const Dashboard: React.FC = ({}) => {
  const { user, favoritesNoodles } = useUserContext();
  const { cart } = useCartContext();
  const showFavorites = () => {
    setTimeout(() => {
      simplereview(); // fix
    }, 500);
  };
  useEffect(() => {
    showFavorites();
  }, []);

  if (user) {
    return (
      <Wrapper>
        <PageTitle title={'DashBoard'} image={''} />
        <div className='section-center page-100'>
          <h2>Welcome, {user.user_name}</h2>
          <OrderSection user={user} />
          <WishListSection />
          {cart.length > 0 && <CartSection />}
        </div>
      </Wrapper>
    );
  } else {
    return <Loading />;
  }
};

export default Dashboard;

const Wrapper = styled.main`
  h2 {
    text-align: center;
  }
  .orderImg {
    width: 100px;
  }
  .favSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .link {
    margin: 1rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .cart-section {
    padding: 1rem;
  }
`;
