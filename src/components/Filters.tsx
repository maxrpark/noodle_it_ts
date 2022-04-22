import React, { useEffect } from 'react';
import { useFilterContext } from '../context/filterContext';

import styled from 'styled-components';
import Sort from './Sort';

import { getUniqueValues } from '../utils/helperFunctions';

type Props = {};

const Filters: React.FC = (props: Props) => {
  const {
    all_products,
    filters: { text, category, brand, min_price, max_price, price },
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const brands = getUniqueValues(all_products, 'brand');
  const tags = getUniqueValues(all_products, 'tags');
  const ratingList = ['all', '1', '2', '3', '4', '5'];
  return (
    <Wrapper>
      <div className='filter-section'>
        <Sort />
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
            <h5>Brands</h5>
            <select
              name='brand'
              value={brand}
              onChange={updateFilters}
              className='brand'
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
            <h5>Price Per Package</h5>
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
          {/* tags */}
          <div className='form-control'>
            <h5>Tags</h5>
            <div className='tags'>
              {tags.map((tag, index) => {
                if (tag === 'all') {
                  return (
                    <button
                      key={index}
                      name='tag'
                      onClick={updateFilters}
                      data-tag='all'
                      type='submit'
                    >
                      {/* className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`} */}
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name='tag'
                    data-tag={tag}
                    onClick={updateFilters}
                    type='button'
                  >
                    {/* className={`${ color === c ? 'color-btn active' : 'color-btn' }`} */}
                    {/* {color === c ? <FaCheck /> : null} */}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of tags */}
          {/* rating */}
          <div className='form-control'>
            <h5>rating</h5>
            <div className='rating'>
              {ratingList.map((star, index) => {
                if (star === 'all') {
                  return (
                    <button
                      type='button'
                      key={index}
                      name='rating'
                      onClick={updateFilters}
                      data-rating='all'
                    >
                      {star}
                    </button>
                  );
                }
                return (
                  <button
                    type='button'
                    key={index}
                    name='rating'
                    data-rating={star}
                    onClick={updateFilters}
                  >
                    {star}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of rating */}
        </form>
      </div>
      <button type='button' className='clear-btn' onClick={clearFilters}>
        {' '}
        clear all
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default Filters;
