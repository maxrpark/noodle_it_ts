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

  let fetchUrl;
  if (query === 'brands') {
    fetchUrl = `brand/${slug}`;
  } else {
    fetchUrl = `${query}/${slug}`;
  }
  const { isLoading, noodles } = useFetch(fetchUrl);
  const [resultDetails, setResultDetails] = useState({} as ResultDetails);

  useEffect(() => {
    if (query === 'brand') {
      noodlesBrandList.find((type) => {
        if (query === 'brand' && type.slug === slug) {
          setResultDetails(type);
        } else if (query === 'brand' && type.slug === slug) {
          if (type.slug === slug) {
            setResultDetails(type);
          }
        }
      });
    }
  }, [noodlesBrandList, noodlesCategoryList]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className='page-100'>
      <PageTitle title={slug} image={resultDetails.image}>
        <p className='dsc'>{resultDetails.description}</p>
      </PageTitle>
      <div className='section-center'>
        <Card noodles={noodles} />
      </div>
    </section>
  );
};

export default NoodlesType;
