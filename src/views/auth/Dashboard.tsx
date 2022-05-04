import React, { useEffect, useState } from 'react';
import simplereview from 'simplereview';
import styled from 'styled-components';

import { useUserContext } from '../../context/userContext';
import { Loading, CardSmall, SectionTitle, PageTitle } from '../../components';

const url = 'https://noodles-api.herokuapp.com/api/users/user-orders/';

const Dashboard: React.FC = ({}) => {
  const { user, favoritesNoodles } = useUserContext();
  const [showMoreFav, setShowMoreFav] = useState(3);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(url + user.user_name)
        .then((res) => res.json())
        .then((data) => {
          setOrderDetails(data);
        });
    }
  }, [user]);

  const toogleFavList = () => {
    if (showMoreFav === 3) {
      setShowMoreFav(favoritesNoodles.length);
    } else {
      setShowMoreFav(3);
    }
  };

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
        <PageTitle title={'DashBoard'} image={''}></PageTitle>
        <div className='section-center page-100'>
          <h2>Welcome, {user.user_name}</h2>
          <div className='orders-section'>
            <SectionTitle title={'Your Orders'} urlPath='' />
            {orderDetails.length > 3 && (
              <button className='link' onClick={toogleFavList}>
                {showMoreFav === 3 ? 'Show More' : 'Show Less'}
              </button>
            )}
            {orderDetails.map((order: any) => {
              return (
                <div key={order.id}>
                  <p>Order ID: {order.id}</p>
                  <p>Date:{order.created_at}</p>
                  <p>Total: {order.paid_amount}</p>
                  <p>See more</p>
                  {/* {order.cart_items.map((item: any) => {
                    return (
                      <div key={item.id}>
                        <img className='orderImg' src={item.image} alt='' />
                        <p>{item.name}</p>
                        <p>{item.amount}</p>
                        <p>{item.price}</p>
                      </div>
                    );
                  })} */}
                </div>
              );
            })}
          </div>
          <div className='favSection'>
            <SectionTitle title={'My Favorites'} urlPath='' />
            {favoritesNoodles.length > 3 && (
              <button className='link' onClick={toogleFavList}>
                {showMoreFav === 3 ? 'Show More' : 'Show Less'}
              </button>
            )}
          </div>
          <CardSmall
            user={user}
            noodles={favoritesNoodles.slice(0, showMoreFav)}
          />
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
  button {
    margin: 1rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
