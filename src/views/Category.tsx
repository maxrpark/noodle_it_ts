import { useEffect, useState } from 'react';
import { NoodleDetails } from '../Context';
import simplereview from 'simplereview';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Components
import Card from '../components/Card';

const baseUrl = 'https://noodleapi.herokuapp.com/api/v1/categories/';
const Category: React.FC = () => {
  const [noodles, setNoodles] = useState([]);
  const { slug } = useParams();

  const getData = async () => {
    try {
      const response = axios(baseUrl + slug);
      const data = await response;
      if (data.status === 200) {
        setNoodles(data.data);
        console.log(data.data);
        simplereview();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
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

export default Category;
