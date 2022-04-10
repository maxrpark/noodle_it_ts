import { useEffect } from 'react';
import { useProductsContext } from '../context/productsContext';
import { Card, Loading, HomeHero } from '../components';
import simplereview from 'simplereview';

const Home: React.FC = () => {
  const { noodles, isProductsLoading } = useProductsContext();

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
    </>
  );
};

export default Home;
