import { NoodleDetails } from '../context/globalContext';
import { useFetch } from '../customHooks/useFetch';

// Components
import Card from '../components/Card';

const Home: React.FC = () => {
  const baseUrl = 'https://noodles-api.herokuapp.com/api/v1/noodles/';
  const fetchUrl = `${baseUrl}`;
  const { isLoading, noodles } = useFetch(fetchUrl);

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

export default Home;
