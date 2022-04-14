import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Components
import { CardList, Loading } from '../components';
import { useProductsContext } from '../context/productsContext';

const ListPage: React.FC = () => {
  const { noodlesBrandList, noodlesCategoryList } = useProductsContext();
  const { slug } = useParams();
  const [noodles, setNoodles] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(noodlesBrandList);

  useEffect(() => {
    if (slug === 'brand') {
      setNoodles(noodlesBrandList);
      setIsLoading(false);
      console.log('brand');
    }
  }, [slug]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='section-center'>
      <h1>{slug}</h1>
      <CardList noodles={noodles} type={`/${slug}`} />
    </div>
  );
};

export default ListPage;
