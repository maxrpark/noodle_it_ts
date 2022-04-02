import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { useUserContext } from '../context/userContext';
import { NoodleDetails } from '../context/globalContext';
import { useProductsContext } from '../context/productsContext';

import { relatedBrand, relatedCategory } from '../utils/helperFunctions';

// components
import { SingleNoodleMain, Card } from '../components';

const Noodle = () => {
  const { noodle, noodles, isProductLoading, getSingleNoodle, baseUrl } =
    useProductsContext();
  const { user, isFavoriteNoodle, setUserFavoriteList, isUserFavoriteNoodle } =
    useUserContext();
  const { slug } = useParams();

  const relatedByBrand = relatedBrand(noodles, noodle?.brand?.name);
  const relatedByCategory = relatedCategory(noodles, noodle?.category);

  const addToFav = () => {
    if (user) setUserFavoriteList(user.user_name, noodle);
  };

  useEffect(() => {
    getSingleNoodle(baseUrl + slug);
    // isUserFavoriteNoodle();
  }, [slug]);

  if (isProductLoading || !noodle) {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        {user && (
          <div>
            <span onClick={addToFav}>
              {isFavoriteNoodle ? (
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
          {relatedByCategory.map((noodle: NoodleDetails) => {
            return <Card key={noodle.id} noodle={noodle} />;
          })}

          <h2>Recommended By Brand</h2>
          {relatedByBrand.map((noodle: NoodleDetails) => {
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
