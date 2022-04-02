import { useEffect } from 'react';
import { NoodleDetails } from '../context/globalContext';
import simplereview from 'simplereview';

import { useProductsContext } from '../context/productsContext';

// Components
import Card from '../components/Card';

const Home: React.FC = () => {
  const { noodles, isProductsLoading } = useProductsContext();

  useEffect(() => {
    if (noodles.length) {
      simplereview();
      // console.log('fix');
    }
  }, [noodles]);

  if (isProductsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='App'>
      {noodles.map((noodle: NoodleDetails) => {
        return <Card key={noodle.id} noodle={noodle} />;
      })}
    </div>
  );
};

export default Home;
