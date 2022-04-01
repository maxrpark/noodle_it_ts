import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import styled from 'styled-components';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import axios from 'axios';
import simpleSlider from '@maxcoding/simpleslider';
import simplereview from 'simplereview';

import { NoodleDetails } from '../context/globalContext';
import { useProductsContext } from '../context/productsContext';

// components
import { SingleNoodleMain, Card } from '../components';

// variables
// const all_noodles = 'https://noodles-api.herokuapp.com/api/v1/noodles/';
const baseUrl = 'https://noodles-api.herokuapp.com/api/v1/noodles/';

const Noodle = () => {
  const { noodle, noodles, isProductLoading, getSingleNoodle, getNoodles } =
    useProductsContext();

  const { user, getUserDetails } = useUserContext();
  const { slug } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const relatedByBrand = (noodle: NoodleDetails) =>
    noodles
      .filter((item: NoodleDetails) => item.brand.name === noodle.brand.name)
      .slice(0, 3);
  const relatedByCategory = (noodle: NoodleDetails) =>
    noodles
      .filter((item: NoodleDetails) => item.category === noodle.category)
      .slice(0, 3);

  const isUserFavoriteNoodle = () => {
    if (user && user.favorites) {
      const userFavorites = user.favorites;
      setIsFavorite((isFavorite) => {
        return (isFavorite =
          userFavorites.filter((fav: any) => fav.slug === noodle.slug).length >
          0);
      });
    }
  };

  const addToFav = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/api/user/user-favorites/${user?.user_name}/${noodle.slug}/`,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFTOKEN',
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          getUserDetails();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (noodle) {
      isUserFavoriteNoodle();
      simpleSlider();
      simplereview();
    }
  }, [noodle]);

  useEffect(() => {
    if (noodle === null) {
      console.log('noodles is null');
      getSingleNoodle(baseUrl + slug);
    }
  }, [slug]);

  if (isProductLoading || !noodle) {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        {user && (
          <div>
            <span onClick={addToFav}>
              {isFavorite ? (
                <AiFillHeart className='heart fill' />
              ) : (
                <AiOutlineHeart className='heart empty' />
              )}
            </span>
          </div>
        )}
        <SingleNoodleMain noodle={noodle} key={noodle.id} />
        <div className='related-noodles'>
          <h2>Recommended By Category</h2>
          {relatedByCategory(noodle).map((noodle: NoodleDetails) => {
            return <Card key={noodle.id} noodle={noodle} />;
          })}

          <h2>Recommended By Brand</h2>
          {relatedByBrand(noodle).map((noodle: NoodleDetails) => {
            return <Card key={noodle.id} noodle={noodle} />;
          })}
        </div>
      </Wrapper>
    );
  }
};

export default Noodle;

const Wrapper = styled.div`
  /* single noodle */
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .description {
    text-align: center;
    margin-bottom: 1rem;
  }
  .instructions {
    max-width: 600px;
    margin: 1rem;
  }
  .section-one {
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  .info p {
    margin: 0.5rem 0;
  }
  .info span {
    color: crimson;
    font-weight: bold;
    text-transform: capitalize;
  }

  //related-noodles
  .related-noodles {
    max-width: 1400px;
    margin: 0 auto;
  }

  .heart {
    color: crimson;
    font-size: 2rem;
  }
`;
