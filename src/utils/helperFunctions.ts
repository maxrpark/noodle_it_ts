// import { NoodleDetails } from '../context/globalContext';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import gsap from 'gsap';
const relatedNoodles = (
  noodles: NoodleDetails[],
  filterByName: string,
  stype: string
) => {
  let relatedNoodles: NoodleDetails[] = [];
  if (filterByName === 'brand') {
    relatedNoodles = noodles.filter(
      (item: NoodleDetails) => item.brand.name === stype
    );
  } else if (filterByName === 'category') {
    relatedNoodles = noodles.filter(
      (item: NoodleDetails) => item.category === stype
    );
  }
  return relatedNoodles.slice(0, 3);
};

const getUniqueValues = (data: NoodleDetails[], type: string) => {
  let unique = data.map((item: NoodleDetails | any) => item[type]);
  if (type === 'brand') {
    unique = unique.map((el: any) => {
      return (el = el.name);
    });
  }
  if (type === 'tags') {
    unique = unique.flat();
  }

  return ['all', ...new Set(unique)];
};

const cartAnimation = () => {
  let lt = gsap.timeline();

  lt.fromTo(
    '.cart-icon',
    {
      rotate: 0,
      scale: 1.4,
    },
    {
      rotate: 360,
      scale: 1,
    }
  );
};

export { relatedNoodles, getUniqueValues, cartAnimation };
