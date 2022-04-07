import { useEffect } from 'react';
import { NoodleDetails } from '../context/globalContext';
import { useProductsContext } from '../context/productsContext';
import { Card, Loading } from '../components';
import simplereview from 'simplereview';

const Home: React.FC = () => {
  const { noodles, isProductsLoading } = useProductsContext();

  useEffect(() => {
    if (noodles.length) {
      simplereview();
      console.log(noodles);
    }
  }, [noodles]);

  if (isProductsLoading) {
    return <Loading />;
  }
  return (
    <div className='page-100'>
      {noodles.map((noodle: NoodleDetails) => {
        return <Card key={noodle.id} noodle={noodle} />;
      })}
    </div>
  );
};

export default Home;
