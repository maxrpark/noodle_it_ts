import { useParams } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';
// Components
import { Card, Loading, PageTitle } from '../components';

const Tags: React.FC = () => {
  const { slug } = useParams();
  const fetchUrl = `tags/${slug}`;
  const { isLoading, noodles } = useFetch(fetchUrl);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <PageTitle title={slug} image={''} />
      <div className='section-center page-100'>
        <Card noodles={noodles} />
      </div>
    </>
  );
};

export default Tags;
