import { useEffect } from 'react';
import { NoodleDetails } from '../context/globalContext';
import { useParams } from 'react-router-dom';
import simplereview from 'simplereview';

import { useProductsContext } from '../context/productsContext';

// Components
import Card from '../components/Card';

const Tags: React.FC = () => {
  const { getNoodles, noodles, isProductsLoading, URL_NOODLES } =
    useProductsContext();
  const { slug } = useParams();
  const fetchUrl = `${URL_NOODLES}tags/${slug}`;

  useEffect(() => {
    getNoodles(fetchUrl);
  }, []);

  useEffect(() => {
    if (noodles.length) {
      simplereview();
      console.log('fix');
    }
  }, [noodles]);

  // if (error) {
  //   return <h1>{error}</h1>;
  // }
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

export default Tags;
