import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useUserContext } from '../context/userContext';
import { NoodleDetails } from '../context/globalContext';
import { useProductsContext } from '../context/productsContext';

import { relatedNoodles } from '../utils/helperFunctions';

// components
import { CardSmall, Loading, SingleNoodleMain } from '../components/';

const Noodle: React.FC = () => {
  const { noodle, noodles, isProductLoading, getSingleNoodle, URL_NOODLES } =
    useProductsContext();
  const { slug } = useParams();

  const { user, isFavoriteNoodle, setUserFavoriteList } = useUserContext();
  const [relatedNoodlesBrand, setRelatedNoodlesBrand] = useState(
    [] as NoodleDetails[]
  );
  const [relatedNoodlesCategory, setRelatedNoodlesCategory] = useState(
    [] as NoodleDetails[]
  );

  const relatedByBrand = relatedNoodles(noodles, 'brand', noodle?.brand?.name);

  const relatedByCategory = relatedNoodles(
    noodles,
    'category',
    noodle?.category
  );

  useEffect(() => {
    getSingleNoodle(URL_NOODLES + 'noodles/' + slug);
  }, [slug]);

  useEffect(() => {
    setRelatedNoodlesBrand(relatedByBrand);
    setRelatedNoodlesCategory(relatedByCategory);
  }, [noodle, noodles]); // fix

  if (isProductLoading) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        {user && (
          <div>
            <span onClick={() => setUserFavoriteList(user.user_name, noodle)}>
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
          {/* <Card noodles={relatedNoodlesCategory} /> */}
          <CardSmall user={null} noodles={relatedNoodlesCategory} />
          <h2>Recommended By Brand</h2>
          {/* <Card noodles={relatedNoodlesBrand} /> */}
          <CardSmall user={null} noodles={relatedNoodlesBrand} />
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
    color: ${(props) => props.theme.specialColor};
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
