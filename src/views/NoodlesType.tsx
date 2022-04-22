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

const NoodlesType: React.FC = () => {
  const { noodlesBrandList, noodlesCategoryList } = useProductsContext();
  const { slug, query } = useParams();
  const fetchUrl = `${query}/${slug}`;
  const { isLoading, noodles } = useFetch(fetchUrl);
  const [resultDetails, setResultDetails] = useState({} as ResultDetails);

  useEffect(() => {
    if (query === 'brand') {
      noodlesBrandList.find((brand) => {
        if (brand.slug === slug) {
          setResultDetails(brand);
        }
      });
    } else if (query === 'categories') {
      noodlesCategoryList.find((category) => {
        if (category.slug === slug) {
          setResultDetails(category);
        }
      });
    }
    console.log(resultDetails);
  }, [noodlesBrandList]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <PageTitle title={resultDetails.name} image={resultDetails.image}>
        <p>{resultDetails.description}</p>
      </PageTitle>
      <div className='section-center'>
        <Card noodles={noodles} />
      </div>
    </>
  );
};

export default NoodlesType;
