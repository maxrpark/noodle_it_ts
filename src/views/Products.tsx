import React, { useEffect } from 'react';
import { useFilterContext } from '../context/filterContext';
import { CardSmall, Loading, CardList } from '../components';
// import simplereview from 'simplereview';
import styled from 'styled-components';

import { getUniqueValues } from '../utils/helperFunctions';

type Props = {};

const Products: React.FC = (props: Props) => {
  const {
    all_products,
    filtered_products,
    sort,
    filters: { text, category, brand, min_price, max_price, price },
    updateSort,
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const brands = getUniqueValues(all_products, 'brand');
  // const tags = getUniqueValues(all_products, 'tags');

  if (all_products.length === 0) {
    return (
      <div className='page-100'>
        <Loading />;
      </div>
    );
  }
  return (
    <Wrapper>
      <div className='sort-section'>
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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* categories */}
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    type='button'
                    name='category'
                    className={`${
                      category === c.toLowerCase() ? 'active' : null
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}

          {/* companies */}
          <div className='form-control'>
            <h5>company</h5>
            <select
              name='brand'
              value={brand}
              onChange={updateFilters}
              className='company'
            >
              {brands.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of companies */}
          {/* price */}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{price}</p>
            <input
              type='range'
              name='price'
              min={min_price}
              max={max_price}
              onChange={updateFilters}
              value={price}
            />
          </div>
          {/* end of price */}
        </form>
      </div>
      <button type='button' className='clear-btn' onClick={clearFilters}>
        {' '}
        clear filters
      </button>

      <div className='section-center'>
        <CardSmall user={null} noodles={filtered_products} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Products;
