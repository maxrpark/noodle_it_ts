import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import noodle_it_img from '../assets/media/noodle_it_img.jpg';

// Components
import { CardList, Loading, PageTitle } from '../components';
import { useProductsContext } from '../context/productsContext';

const ListPage: React.FC = () => {
  const { noodlesBrandList, noodlesCategoryList } = useProductsContext();
  const { slug } = useParams();
  const [noodles, setNoodles] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug === 'brands') {
      setNoodles(noodlesBrandList);
      setIsLoading(false);
    }
    if (slug === 'categories') {
      setNoodles(noodlesCategoryList);
      setIsLoading(false);
    }
  }, [noodlesCategoryList, noodlesBrandList]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className='page-100'>
      <PageTitle title={slug} image={noodle_it_img} />
      <div className='section-center'>
        <CardList noodles={noodles} type={`${slug}`} />
      </div>
    </main>
  );
};

export default ListPage;
