import { useParams } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';

// Components
import { Card, Loading } from '../components';

const Category: React.FC = () => {
  const { slug } = useParams();
  const fetchUrl = `categories/${slug}`;

  const { isLoading, noodles } = useFetch(fetchUrl);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='section-center'>
      <h1>{slug}</h1>
      <Card noodles={noodles} />
    </div>
  );
};

export default Category;
