import React, { useEffect } from 'react';
import { useFilterContext } from '../context/filterContext';
import { Card, Loading, CardList } from '../components';
import simplereview from 'simplereview';

type Props = {};

const Products: React.FC = (props: Props) => {
  const { all_products, filtered_products } = useFilterContext();

  useEffect(() => {
    if (all_products.length) {
      simplereview();
    }
  }, [all_products]);

  if (all_products.length === 0) {
    return (
      <div className='page-100'>
        <Loading />;
      </div>
    );
  }
  return (
    <div className='section-center'>
      <Card noodles={filtered_products} />
    </div>
  );
};

export default Products;
