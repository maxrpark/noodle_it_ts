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

const getUniqueValues = (data: NoodleDetails[], type: string) => {
  let unique = data.map((item: NoodleDetails | any) => item[type]);
  if (type === 'brand') {
    unique = unique.map((el: any) => {
      return (el = el.name);
    });
  }
  if (type === 'tags') {
    let tagsList: any = [];
    unique.map((el: any) => {
      el.map((el: any) => {
        tagsList.push(el);
      });
    });
    unique = tagsList;
    return ['all', ...new Set(unique)];
  }

  return ['all', ...new Set(unique)];
};

export { relatedNoodles, getUniqueValues };
