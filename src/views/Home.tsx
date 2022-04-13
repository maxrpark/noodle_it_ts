import { useEffect } from 'react';
import { useProductsContext } from '../context/productsContext';
import { Card, Loading, HomeHero, CardList } from '../components';
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
      <h2>Categories</h2>
      <CardList noodles={noodlesCategoryList} type={'brand'} />
      <h2>Brands</h2>
      <CardList noodles={noodlesBrandList} type={'category'} />
    </>
  );
};

export default Home;
