import { useEffect, useState } from 'react';
import { useProductsContext } from '../context/productsContext';
import { Card, Loading, HomeHero, CardList, SectionTitle } from '../components';
import simplereview from 'simplereview';

const Home: React.FC = () => {
  const { noodles, isProductsLoading, noodlesCategoryList, noodlesBrandList } =
    useProductsContext();

  const [numberOfItems, setNumberOfItems] = useState(10);

  const checkSize = () => {
    console.log('resize');
    if (window.innerWidth < 768) {
      setNumberOfItems(4);
    } else {
      setNumberOfItems(noodlesBrandList.length);
    }
  };

  useEffect(() => {
    // window event if window width is less than 768px numberOfItems will be set to 3
    window.addEventListener('resize', checkSize);

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  useEffect(() => {
    if (noodles.length) {
      simplereview();
    }
  }, [noodles]);

  if (isProductsLoading) {
    return <Loading />;
  }
  return (
    <>
      <HomeHero />
      <div className='section-center'>
        <SectionTitle title={'Products'} urlPath='products' />
        <Card noodles={noodles.slice(0, 8)} />
        <SectionTitle title={'Categories'} urlPath='list-page/categories' />
        <CardList
          layout={'cards-layout-2'}
          noodles={noodlesCategoryList.slice(0, numberOfItems)}
          type={'categories'}
        />
        <SectionTitle title={'Brands'} urlPath='list-page/brands' />
        <CardList
          layout={'cards-layout-1'}
          noodles={noodlesBrandList.slice(0, numberOfItems)}
          type={'brand'}
        />
      </div>
    </>
  );
};

export default Home;
