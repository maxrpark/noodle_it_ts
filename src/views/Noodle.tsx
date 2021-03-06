import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import { useProductsContext } from '../context/productsContext';
import { useUserContext } from '../context/userContext';
import { relatedNoodles } from '../utils/helperFunctions';
import { useGlobalContext } from '../context/globalContext';

// components
import {
  CardSmall,
  Loading,
  SingleNoodleMain,
  SectionTitle,
} from '../components/';

const Noodle: React.FC = () => {
  const { noodle, noodles, isProductLoading, getSingleNoodle, URL_NOODLES } =
    useProductsContext();
  const { getUserFavoriteList, isUserFavoriteNoodle } = useUserContext();
  const { closeModal } = useGlobalContext();

  const { slug } = useParams();
  const [relatedNoodlesBrand, setRelatedNoodlesBrand] = useState(
    [] as NoodleDetails[]
  );
  const [relatedNoodlesCategory, setRelatedNoodlesCategory] = useState(
    [] as NoodleDetails[]
  );

  const relatedByBrand = relatedNoodles(
    noodles,
    'brand',
    noodle?.brand?.name,
    noodle?.name
  );
  const relatedByCategory = relatedNoodles(
    noodles,
    'category',
    noodle?.category,
    noodle?.name
  );

  useEffect(() => {
    getSingleNoodle(URL_NOODLES + 'noodles/' + slug);
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    setRelatedNoodlesBrand(relatedByBrand);
    setRelatedNoodlesCategory(relatedByCategory);

    if (noodle && noodle.name) {
      document.title = `Noodle it! || ${noodle.name}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noodle, noodles]); // fix

  useEffect(() => {
    if (noodles && noodle) {
      getUserFavoriteList();
      isUserFavoriteNoodle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noodles]); // fix

  if (isProductLoading) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <SingleNoodleMain noodle={noodle} key={noodle.id} />

        <div className='related-noodles'>
          <div className='recommended-section'>
            <SectionTitle
              title={'Same Category'}
              urlPath={`noodles/categories/${noodle.category}`}
            />
            <CardSmall user={null} noodles={relatedNoodlesCategory} />
            <SectionTitle
              title={'Same Brand'}
              urlPath={`noodles/brand/${noodle.brand.slug}`}
            />
            <CardSmall user={null} noodles={relatedNoodlesBrand} />
          </div>
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

  .title {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 1rem;
  }
  .noodles-section-title {
    border-bottom: 2px solid white;
    padding: 0.5rem 0;

    @media screen and (min-width: 768px) {
      margin-top: 0;
    }
  }

  .description {
    text-align: center;
    margin-bottom: 1rem;
  }

  .section-one {
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .single-noodle-info p {
    margin: 0.5rem 0;
  }
  .single-noodle-info span {
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

  // ingredients
  .ingredients {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .icon-scale {
    transform: translateY(-2px);
  }

  // recommended
  .recommended-section {
    max-width: 960px;
    margin: 0 auto;
  }
  .recommended-title {
    margin: 1rem 0;
  }
  /* /spicy-level */
  .spicy-level {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.2rem;
  }
`;
