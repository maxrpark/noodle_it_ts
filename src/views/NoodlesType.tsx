import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';
import { useProductsContext } from '../context/productsContext';
import { usePageTitle } from '../customHooks/UsePageTitle';
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
        }
      });
    } else if (query === 'categories') {
      noodlesCategoryList.find((type) => {
        if (query === 'categories' && type.slug === slug) {
          setResultDetails(type);
        }
      });
    }
  }, [noodlesBrandList, noodlesCategoryList]);

  let title = slug;
  if (slug && query) {
    title =
      query?.slice(0, 1).toUpperCase() +
      query?.slice(1) +
      ' || ' +
      slug?.slice(0, 1).toUpperCase() +
      slug?.slice(1);
  }
  usePageTitle(title); // page title hook

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className=''>
      <PageTitle title={slug} image={resultDetails.image}>
        <p className='dsc'>{resultDetails.description}</p>
      </PageTitle>
      <div className='section-center page-100'>
        <Card noodles={noodles} />
      </div>
    </section>
  );
};

export default NoodlesType;
