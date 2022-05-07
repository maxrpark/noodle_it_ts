import React from 'react';
import { useFilterContext } from '../context/filterContext';
import styled from 'styled-components';

const Sort: React.FC = () => {
  const { sort, updateSort } = useFilterContext();
  return (
    <Wrapper>
      {/* <label htmlFor='sort'>sort by</label> */}
      <select
        name='sort'
        id='sort'
        className='sort-input'
        value={sort}
        onChange={updateSort}
      >
        <option value='price-lowest'>price (lowest)</option>
        <option value='price-highest'>price (highest)</option>
        <option value='name-a'>name (a-z)</option>
        <option value='name-z'>name (z-a)</option>
      </select>
    </Wrapper>
  );
};
const Wrapper = styled.form`
  /* display: grid;
  grid-template-columns: auto 1fr; */
  /* justify-content: end; */
  /* justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 1rem; */
  margin: 0.5rem 0;
  select {
    width: 100%;
  }
`;
export default Sort;
