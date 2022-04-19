import { useEffect } from 'react';
import { useProductsContext } from '../context/productsContext';
import { Card, Loading, HomeHero, CardList, SectionTitle } from '../components';
import simplereview from 'simplereview';

const Home: React.FC = () => {
  const { noodles, isProductsLoading, noodlesCategoryList, noodlesBrandList } =
    useProductsContext();

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
        <SectionTitle title={'Our Products'} urlPath='products' />
        <Card noodles={noodles.slice(0, 6)} />
        <SectionTitle title={'Categories'} urlPath='list-page/category' />
        <CardList noodles={noodlesCategoryList.slice(0, 3)} type={'category'} />
        <SectionTitle title={'Brands'} urlPath='list-page/brand' />
        <CardList noodles={noodlesBrandList.slice(0, 3)} type={'brand'} />
      </div>
    </>
  );
};

export default Home;
