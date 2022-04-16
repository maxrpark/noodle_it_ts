import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';
import { useProductsContext } from '../context/productsContext';

// Components
import { Card, Loading, PageTitle } from '../components';

interface ResultDetails {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}

const Brand: React.FC = () => {
  const { noodlesBrandList } = useProductsContext();
  const { slug } = useParams();
  const fetchUrl = `brand/${slug}`;
  const { isLoading, noodles } = useFetch(fetchUrl);
  const [brandDetails, setBrandDetails] = useState({} as ResultDetails);

  useEffect(() => {
    noodlesBrandList.find((brand) => {
      if (brand.slug === slug) {
        setBrandDetails(brand);
      }
    });
    console.log(brandDetails);
  }, [noodlesBrandList]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <PageTitle title={brandDetails.name} image={brandDetails.image}>
        <p>{brandDetails.description}</p>
      </PageTitle>
      <div className='section-center'>
        <Card noodles={noodles} />
      </div>
    </>
  );
};

export default Brand;
