import React from 'react';
import { NoodleDetails } from '../Context';
import { Link } from 'react-router-dom';

type Props = {
  noodle: NoodleDetails;
};

const NoodleTopSection: React.FC<Props> = ({ noodle }) => {
  return (
    <>
      <div className='top'>
        <h2>{noodle.name}</h2>
        <span
          className='simpleReview'
          resultvalue={noodle.rating}
          id='review'
        ></span>
        <div className='related-links'>
          <Link
            to={`/category/${noodle.category}`}
            className={`special-link ${noodle.category}`}
          >
            {noodle.category}
          </Link>
          <Link
            to={`/brand/${noodle.brand.slug}`}
            className={`special-link ${noodle.brand.name}`}
          >
            {noodle.brand.slug}
          </Link>
        </div>
      </div>
      <div className='description'>
        <h3>Description</h3>
        <p>{noodle.description}</p>
      </div>
    </>
  );
};

export default NoodleTopSection;
