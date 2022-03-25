import React from 'react';
import { Link } from 'react-router-dom';
import { NoodleDetails } from '../Context';
type Props = {
  noodle: NoodleDetails;
};

const SingleNoodleMain: React.FC<Props> = ({ noodle }) => {
  return (
    <div className='section-center'>
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
      <div className='main-section'>
        <div className='section-one'>
          <section className='sliderContainer'>
            {noodle.images.map((image: string) => {
              return (
                <div className='slide' key={image}>
                  <img className='img' src={image} alt={noodle.name} />;
                </div>
              );
            })}
          </section>
          <div className='tags-container'>
            <h3>Tags: </h3>
            {noodle.tags.map((tag: string) => {
              return (
                <p className='tag' key={tag}>
                  #{tag}
                </p>
              );
            })}
          </div>
        </div>
        <section className='info'>
          <div>
            <h3>Price & Amount</h3>
            <p>
              Price Per package: <span> ${noodle.price_per_package}</span>
            </p>
            <p>
              Price Per unit: <span> ${noodle.price_per_unite}</span>
            </p>
            <p>
              Amount Per Package: <span>{noodle.amount_per_package}</span>
            </p>
          </div>

          <p>
            Spicy Level: <span>{noodle.spicy_level}</span>{' '}
          </p>
          <p>
            Category: <span> {noodle.category}</span>
          </p>
          <p>
            Brand: <span>{noodle.brand.name}</span>{' '}
          </p>

          <h3>Ingredients</h3>
          {noodle.ingredients.map((tag: string) => {
            return (
              <p key={tag}>
                <span>{tag}</span>
              </p>
            );
          })}
        </section>
      </div>

      <div className='instructions'>
        <h3>Instructions</h3>
        <p>{noodle.instructions}</p>
      </div>

      <Link to='/'>
        <button className='back'>Back</button>
      </Link>
    </div>
  );
};

export default SingleNoodleMain;
