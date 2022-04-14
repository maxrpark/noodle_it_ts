import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CardSmall } from '../components';
import { NoodleDetails } from '../context/globalContext';
import axios from 'axios';

interface StateInterface {
  result: NoodleDetails[] | any;
  query: string;
}

const ResultPage: React.FC = () => {
  const { state } = useLocation() as { state: StateInterface };
  const [noodles, setNoodles] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const search = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setNoodles([]);
    if (search.current?.value.length) {
      setUserQuery(search.current.value);
      try {
        const response = await axios.get(
          'https://noodles-api.herokuapp.com/api/v1/search/?query=' +
            search.current.value
        );
        if (response.data.length) {
          setNoodles(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      search.current.value = '';
    }
  };

  useEffect(() => {
    if (state && state.result) {
      setNoodles(state.result);
      setUserQuery(state.query);
    }
  }, [state, search]);
  return (
    <div className='section-center page-100'>
      <form onSubmit={handleSearch}>
        <input type='text' ref={search} />
      </form>
      {userQuery.length ? <h1>Results for {userQuery}</h1> : <h1>Search</h1>}
      {noodles.length > 0 && <CardSmall user={null} noodles={noodles} />}
      <div></div>
    </div>
  );
};

export default ResultPage;
