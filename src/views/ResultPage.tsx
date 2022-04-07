import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '../components';
import { NavLink, useNavigate } from 'react-router-dom';

import axios from 'axios';

const ResultPage: React.FC = () => {
  const { state } = useLocation() as any;
  const [noodles, setNoodles] = useState([]);
  const [userQuery, setUserQuery] = useState('');

  const search = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();

    if (search.current?.value.length) {
      setUserQuery(search.current.value);
      try {
        const response = await axios.get(
          'https://noodles-api.herokuapp.com/api/v1/search/?query=' +
            search.current.value
        );
        if (response.data.length) {
          setNoodles(response.data);
        } else {
          setNoodles([]);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (state && state.length) {
      setNoodles(state.result);
      setUserQuery(state.query);
    }
  }, [state, userQuery]);
  return (
    <>
      <form onSubmit={handleSearch}>
        <input type='text' ref={search} />
      </form>
      {userQuery.length ? <h1>Results for {userQuery}</h1> : <h1>Search</h1>}
      {noodles.length > 0 &&
        noodles.map((noodle: any) => {
          return <Card key={noodle.id} noodle={noodle} />;
        })}
      <div></div>
    </>
  );
};

export default ResultPage;
