import React, { useEffect } from 'react';
import { useFilterContext } from '../context/filterContext';
import { usePageTitle } from '../customHooks/UsePageTitle';
import {
  Loading,
  Card,
  Filters,
  PageTitle,
  FallbackMessegeComponent,
} from '../components';
import simplereview from 'simplereview';
import styled from 'styled-components';

type Props = {};

const Products: React.FC = (props: Props) => {
  usePageTitle('Products');
  const { all_products, filtered_products, clearFilters } = useFilterContext();

  useEffect(() => {
    simplereview();
  }, [all_products, filtered_products]);

  if (all_products.length === 0) {
    return (
      <div className='page-100'>
        <Loading />;
      </div>
    );
  }
  return (
    <Wrapper className='page-100'>
      <PageTitle title={'Products'} image={''}></PageTitle>
      <div className='section-center'>
        <div className='filters'>
          <Filters />
        </div>
        {filtered_products.length === 0 ? (
          <div className='filter-msg'>
            <FallbackMessegeComponent title='No products found'>
              <button type='button' className='btn' onClick={clearFilters}>
                clear all
              </button>
            </FallbackMessegeComponent>
          </div>
        ) : (
          <Card noodles={filtered_products} />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .filter-msg {
    align-self: flex-start;
    margin: 0 auto;
    margin-top: 2rem;
  }
  @media screen and (min-width: 768px) {
    .section-center {
      max-width: 1420px;
      display: flex;
      position: relative;
      height: 100%;
    }
    .filters {
      display: block;
      height: 100%;
      width: 500px;
      position: sticky;
      position: -webkit-sticky;
      margin-top: 10px;
      top: 0; /* required */
      padding: 0.5rem 0;
    }
  }
`;

export default Products;
