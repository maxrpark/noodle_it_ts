import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NoodleDetails } from '../context/globalContext';
import { useProductsContext } from '../context/productsContext';

import { relatedNoodles } from '../utils/helperFunctions';
// components
import { CardSmall, Loading, SingleNoodleMain } from '../components/';

const Noodle: React.FC = () => {
  const { noodle, noodles, isProductLoading, getSingleNoodle, URL_NOODLES } =
    useProductsContext();

  const { slug } = useParams();
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
        <SingleNoodleMain noodle={noodle} key={noodle.id} />
        <div className='related-noodles'>
          <div className='recommended-section'>
            <h3 className='recommended-title'>Recommended By Category</h3>
            <CardSmall user={null} noodles={relatedNoodlesCategory} />
            <h3 className='recommended-title'>Recommended By Brand</h3>
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
    margin: 1rem 0;
    border-bottom: 2px solid white;
    padding-bottom: 0.5rem;

    @media screen and (min-width: 768px) {
      margin-top: 0;
    }
  }

  .description {
    text-align: center;
    margin-bottom: 1rem;
  }
  .instructions {
    max-width: 600px; // fix
  }
  .section-one {
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
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
`;
