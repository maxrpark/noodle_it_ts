import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import gsap from 'gsap';
const relatedNoodles = (
  noodles: NoodleDetails[],
  filterByName: string,
  type: string,
  noodleName: string
) => {
  let relatedNoodles: NoodleDetails[] = [];
  if (filterByName === 'brand') {
    relatedNoodles = noodles
      .filter((item: NoodleDetails) => item.brand.name === type)
      .filter((item: NoodleDetails) => item.name !== noodleName);
  } else if (filterByName === 'category') {
    relatedNoodles = noodles
      .filter((item: NoodleDetails) => item.category === type)
      .filter((item: NoodleDetails) => item.name !== noodleName);
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
let canPlay = false;
let tl = gsap.timeline({ paused: true, reversed: true });
const playAnimation = () => {
  tl.to('.navIcon', {
    rotate: 90,
    duration: 0,
  })
    .to(
      '.sidebar-wrapper',
      {
        transformOrigin: 'center center',
        height: '100%',
        width: '100%',
        position: 'fixed',
        duration: 0,
      },
      0
    )
    .to('.sidebar-wrapper', {
      opacity: 1,
      duration: 0,
    })
    .to('.sidebar', {
      left: 0,
      duration: 0.3,
    })
    .to(
      '.close-btn',
      {
        opacity: 1,
        rotate: 180,
        duration: 0,
      },
      '+=.7'
    );
};

// };

const menuAnimation = () => {
  canPlay = true;
  if (canPlay) {
    playAnimation();
    canPlay = false;
  }
  if (tl.reversed()) {
    tl.play();
  } else {
    tl.reverse(1);
  }
};

export { relatedNoodles, getUniqueValues, cartAnimation, menuAnimation };
