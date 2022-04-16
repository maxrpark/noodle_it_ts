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

const Category: React.FC = () => {
  const { noodlesCategoryList } = useProductsContext();
  const [categoryDetails, setCategoryDetails] = useState({} as ResultDetails);
  const { slug } = useParams();

  const fetchUrl = `categories/${slug}`;

  const { isLoading, noodles } = useFetch(fetchUrl);

  useEffect(() => {
    noodlesCategoryList.find((category) => {
      if (category.slug === slug) {
        setCategoryDetails(category);
      }
    });
  }, [noodlesCategoryList]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className='page-100'>
      <PageTitle title={categoryDetails.name} image={categoryDetails.image}>
        <p>{categoryDetails.description}</p>
      </PageTitle>
      <div className='section-center'>
        <Card noodles={noodles} />
      </div>
    </section>
  );
};

export default Category;
