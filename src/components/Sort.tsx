import React from 'react';
import { useFilterContext } from '../context/filterContext';

type Props = {};

const Sort: React.FC = (props: Props) => {
  const { all_products, filtered_products, sort, updateSort } =
    useFilterContext();
  return (
    <form>
      <label htmlFor='sort'>sort by</label>
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
    </form>
  );
};

export default Sort;
