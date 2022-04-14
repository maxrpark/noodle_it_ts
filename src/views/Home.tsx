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
      <Card noodles={noodles} />
      <SectionTitle title={'Categories'} urlPath='category' />
      <CardList noodles={noodlesCategoryList} type={'category'} />
      <SectionTitle title={'Brands'} urlPath='brand' />
      <CardList noodles={noodlesBrandList} type={'brand'} />
    </>
  );
};

export default Home;
