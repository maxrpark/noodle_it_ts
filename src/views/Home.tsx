import { useGlobalContext, NoodleDetails } from '../Context';

// Components
import Card from '../components/Card';

const Home: React.FC = () => {
  const { isLoading, noodles } = useGlobalContext();

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
