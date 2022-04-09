import { NoodleDetails } from '../context/globalContext';
import { useParams } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';
// Components
import Card from '../components/Card';
import { Loading } from '../components';

const Tags: React.FC = () => {
  const { slug } = useParams();
  const fetchUrl = `tags/${slug}`;
  const { isLoading, noodles } = useFetch(fetchUrl);

  if (isLoading) {
    return <Loading />;
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
