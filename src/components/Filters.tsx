import React, { useEffect } from 'react';
import { useFilterContext } from '../context/filterContext';

import { IconsList } from '../components/index';
import styled from 'styled-components';
import { getUniqueValues } from '../utils/helperFunctions';
import { Sort } from '../components/index';
const Filters: React.FC = () => {
  const {
    all_products,
    filters: { text, category, brand, tag: selectedTag, rating, spicy_level },
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const brands = getUniqueValues(all_products, 'brand');
  const tags = getUniqueValues(all_products, 'tags');
  const rankingList = ['all', '1', '2', '3', '4', '5'];
  useEffect(() => {
    clearFilters();
  }, []);

  return (
    <Wrapper>
      <div className='filter-section'>
        <h5>Sort by</h5>
        <Sort />
        <form onSubmit={(e) => e.preventDefault()}>
          <h5>Search</h5>
          <div className='form-control filter-text'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className='filter-options'>
            {/* categories */}
            <div className='form-control category'>
              <h5>category</h5>
              <div className='buttons'>
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
            <div className='form-control special-btns'>
              <h5>rating</h5>
              <div className='buttons'>
                {rankingList.map((star, index) => {
                  if (star === 'all') {
                    return (
                      <button
                        type='button'
                        className={`rating-btn ${
                          rating === 'all' ? 'active' : null
                        }`}
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
                      className={`rating-btn ${
                        rating === star ? 'active' : null
                      }`}
                      name='rating'
                      onClick={updateFilters}
                      data-rating={star}
                    >
                      {/* {star} */}
                      <IconsList iconType={''} numberOfIcons={+star} />
                    </button>
                  );
                })}
              </div>
            </div>
            {/* end of rating */}
            {/* Spicy */}
            <div className='form-control spicy_level special-btns'>
              <h5>Spicy</h5>
              <div className='buttons'>
                {rankingList.map((pepper, index) => {
                  if (pepper === 'all') {
                    return (
                      <button
                        type='button'
                        key={index}
                        className={`spicy-btn ${
                          spicy_level === 'all' ? 'active' : null
                        }`}
                        name='spicy_level'
                        onClick={updateFilters}
                        data-spicy_level='all'
                      >
                        {pepper}
                      </button>
                    );
                  }
                  return (
                    <button
                      type='button'
                      key={index}
                      name='spicy_level'
                      className={`spicy-btn ${
                        pepper == spicy_level ? 'active' : null
                      }`}
                      onClick={updateFilters}
                      data-spicy_level={pepper}
                    >
                      <IconsList iconType={'pepper'} numberOfIcons={+pepper} />
                    </button>
                  );
                })}
              </div>
            </div>
            {/* end of Spicy */}
          </div>
          {/* tags */}
          <div className='form-control tags special-btns'>
            <h5>Tags</h5>
            <div className='buttons'>
              {tags.map((tag, index) => {
                if (tag === 'all') {
                  return (
                    <button
                      key={index}
                      name='tag'
                      onClick={updateFilters}
                      data-tag='all'
                      type='submit'
                      className={`tag-btn ${
                        selectedTag === 'all' ? 'active' : null
                      }`}
                    >
                      {/* className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`} */}
                      #all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name='tag'
                    className={`tag-btn ${
                      selectedTag === tag ? 'active' : null
                    }`}
                    data-tag={tag}
                    onClick={updateFilters}
                    type='button'
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of tags */}
          <button type='button' className='clear-btn' onClick={clearFilters}>
            clear all
          </button>
        </form>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  @media screen and (min-width: 960px) {
    max-width: 363px;
  }
  .filter-section {
    background: white;
    padding: 0 0.5rem;
    padding: 0.5rem;
  }
  h5 {
    text-transform: capitalize;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .form-control {
    margin: 0.5rem 0;
  }
  .filter-text {
    max-width: unset;
  }
  .tags {
    margin: 0 auto;
  }
  .buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  button {
    border: none;
    color: white;
    background: var(--special-color-1);
    transition: var(--transition-1);
    border: 1px solid var(--special-color-1);
    padding: 0.4rem;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    text-transform: capitalize;
  }

  /* category */
  .category button {
    width: 100%;
  }

  button.active {
    color: var(--special-color-1);
    background: transparent;
  }

  .special-btns .buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    justify-content: center;
  }
  .clear-btn {
    margin: 1rem auto;
    width: 100%;
  }
`;
export default Filters;
