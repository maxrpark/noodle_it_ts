import React from 'react';
import { NoodleDetails } from '../../context/globalContext';
import { GiKitchenScale } from 'react-icons/gi';
type Props = {
  noodle: NoodleDetails;
};

const NoodleInfo: React.FC<Props> = ({ noodle }) => {
  return (
    <section className='single-noodle-info'>
      <h3 className='noodles-section-title'>Information</h3>
      <p>
        Price Per package: <span> ${noodle.price_per_package}</span>
      </p>
      <p>
        Price Per unit: <span> ${noodle.price_per_unite}</span>
      </p>
      <p>
        Amount Per Package: <span>{noodle.amount_per_package}</span>
      </p>
      <p>
        Spicy Level: <span>{noodle.spicy_level}</span>{' '}
      </p>
      <p>
        Category: <span> {noodle.category}</span>
      </p>
      <p>
        Brand: <span>{noodle.brand.name}</span>{' '}
      </p>

      <h3 className='noodles-section-title'>Ingredients</h3>
      {noodle.ingredients.map((ingredient: string) => {
        return (
          <p className='ingredients' key={ingredient}>
            <GiKitchenScale className='icon-scale' />
            <span>{ingredient}</span>
          </p>
        );
      })}
    </section>
  );
};

export default NoodleInfo;
