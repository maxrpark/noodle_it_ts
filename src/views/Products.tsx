import React, { useEffect } from 'react';
import { useFilterContext } from '../context/filterContext';
import { Loading, Card, Filters } from '../components';
import simplereview from 'simplereview';
import styled from 'styled-components';

type Props = {};

const Products: React.FC = (props: Props) => {
  const { all_products, filtered_products } = useFilterContext();

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
    <Wrapper>
      <div className='section-center'>
        <Filters />
        <Card noodles={filtered_products} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* .single-card {
    opacity: 0;
    transform: scale(0.9);
  } */
`;

export default Products;
