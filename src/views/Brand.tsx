import { useEffect } from 'react';
import { NoodleDetails } from '../Context';
import { useParams } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';

// Components
import Card from '../components/Card';

// variables
const baseUrl = 'https://noodles-api.herokuapp.com/api/v1/brand/';
const Brand: React.FC = () => {
  const { slug } = useParams();
  const fetchUrl = `${baseUrl}${slug}`;
  const { isLoading, noodles, error } = useFetch(fetchUrl);

  if (error) {
    return <h1>{error}</h1>;
  }
  if (isLoading) {
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

export default Brand;
