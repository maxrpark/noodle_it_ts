import React, { useEffect, useRef } from 'react';
import { CardSmall, PageTitle, Loading } from '../components/index';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

const ResultPage: React.FC = () => {
  const search = useRef<HTMLInputElement>(null);
  const { searchUserQuery, query, result, isLoading } = useGlobalContext();

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (search.current?.value.length) {
      searchUserQuery(search.current!.value);
      search.current!.value = '';
      console.log(search.current!.value);
    }
  };

  useEffect(() => {
    search.current?.focus();
  }, [isLoading]);

  return (
    <Wrapper>
      <PageTitle title={'Search'} image={''} />
      <div className='section-center page-100'>
        <h3>Search noodles by name</h3>
        <form onSubmit={handleSearch}>
          <input type='text' placeholder='E.g: Sinramyoen' ref={search} />
        </form>
        {isLoading ? (
          <div className='section-center page-100'>
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            {query.length >= 1 && (
              <h2>
                {result?.length} Results for {query}
              </h2>
            )}
            {result && result.length > 0 && (
              <CardSmall user={null} noodles={result} />
            )}
          </>
        )}
      </div>
      {/* )} */}
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
