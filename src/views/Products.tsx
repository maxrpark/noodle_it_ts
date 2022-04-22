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

    // const arrayOfCards = gsap.utils.toArray('.single-card');
    // if (filtered_products.length) {
    //   gsap.set(arrayOfCards, {
    //     duration: 0.2,
    //     scale: 0.9,
    //     opacity: 0,
    //   });
    //   let tl = gsap.timeline();
    //   tl.to(arrayOfCards, {
    //     scale: 1,
    //     opacity: 1,
    //     stagger: 0.17,
    //     ease: 'easyInOut',
    //   });
    // }
    console.log('hello');
  }, [filtered_products]);

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
