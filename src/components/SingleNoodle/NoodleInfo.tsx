import React from 'react';
import { NoodleDetails } from '../../context/globalContext';

type Props = {
  noodle: NoodleDetails;
};

const NoodleInfo: React.FC<Props> = ({ noodle }) => {
  return (
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
      {noodle.ingredients.map((ingredient: string) => {
        return (
          <p key={ingredient}>
            <span>{ingredient}</span>
          </p>
        );
      })}
    </section>
  );
};

export default NoodleInfo;
