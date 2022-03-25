import { useEffect } from 'react';
import { useGlobalContext, NoodleDetails } from '../Context';
import simplereview from 'simplereview';
// Components
import Card from '../components/Card';

const Home: React.FC = () => {
  const { noodles } = useGlobalContext();

  useEffect(() => {
    simplereview();
  }, []);

  if (noodles.length === 0) {
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
