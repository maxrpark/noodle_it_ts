import { NoodleDetails } from '../context/globalContext';

const relatedNoodles = (
  noodles: NoodleDetails[],
  filterByName: string,
  stype: string
) => {
  let relatedNoodles: NoodleDetails[] = [];
  if (filterByName === 'brand') {
    relatedNoodles = noodles
      .filter((item: NoodleDetails) => item.brand.name === stype)
      .slice(0, 3);
  } else if (filterByName === 'category') {
    relatedNoodles = noodles.filter(
      (item: NoodleDetails) => item.category === stype
    );
  }
  return relatedNoodles;
};

export { relatedNoodles };
