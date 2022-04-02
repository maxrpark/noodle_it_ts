import { NoodleDetails } from '../context/globalContext';

const relatedBrand = (noodles: NoodleDetails[], filterByName: {}) =>
  noodles
    .filter((item: NoodleDetails) => item.brand.name === filterByName)
    .slice(0, 3);

const relatedCategory = (noodles: NoodleDetails[], filterByName: {}) =>
  noodles
    .filter((item: NoodleDetails) => item.category === filterByName)
    .slice(0, 3);

export { relatedBrand, relatedCategory };
