import { NoodleDetails } from '../Context';
import { useFetch } from '../customHooks/useFetch';
import { useParams } from 'react-router-dom';

// Components
import Card from '../components/Card';

const baseUrl = 'https://noodleapi.herokuapp.com/api/v1/categories/';
const Category: React.FC = () => {
  const { slug } = useParams();
  const fetchUrl = `${baseUrl}${slug}`;
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

export default Category;
