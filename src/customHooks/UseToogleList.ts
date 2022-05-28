import { useState } from 'react';

export const UseToogleList = () => {
  const [showList, setShowList] = useState(3);

  const toogleListFunc = (items: number) => {
    if (showList === 3) {
      setShowList(items);
    } else {
      setShowList(3);
    }
  };

  return { showList, toogleListFunc };
};
