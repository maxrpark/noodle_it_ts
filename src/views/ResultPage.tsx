import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CardSmall, PageTitle } from '../components/index';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
interface StateInterface {
  result: NoodleDetails[] | any;
  query: string;
}

const ResultPage: React.FC = () => {
  const search = useRef<HTMLInputElement>(null);
  // const [isLoading, setIsLoading] = useState(false);

  const { searchUserQuery, query, result, isLoading } = useGlobalContext();

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (search.current?.value.length) {
      searchUserQuery(search.current!.value);
    }
  };

  useEffect(() => {
    search.current?.focus();
  }, [isLoading]);

  return (
    <Wrapper>
      <PageTitle title={'Search'} image={''} />
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className='section-center page-100'>
          <h3>Search noodles by name</h3>
          <form onSubmit={handleSearch}>
            <input type='text' placeholder='E.g: Sinramyoen' ref={search} />
          </form>
          {query.length >= 1 && (
            <h2>
              {result?.length} Results for {query}
            </h2>
          )}
          {result && result.length > 0 && (
            <CardSmall user={null} noodles={result} />
          )}
          <div></div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h2,
  h3 {
    text-align: center;
    margin: 0.5rem;
  }
  form {
    font-family: var(--primary-font-family);
    margin: 1rem auto;
    padding: 1rem;
  }
  input {
    height: 35px;
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
  }
`;

export default ResultPage;
