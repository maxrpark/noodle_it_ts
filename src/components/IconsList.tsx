import React, { ReactNode } from 'react';
import { FaPepperHot } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

type Props = {
  iconType: string;
  numberOfIcons: number;
};

const IconsList: React.FC<Props> = ({ iconType, numberOfIcons }) => {
  let icon: ReactNode;
  if (iconType === 'pepper') {
    icon = <FaPepperHot />;
  } else {
    icon = <AiFillStar />;
  }
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    return <span key={index}>{numberOfIcons >= index + 1 && icon}</span>;
  });

  return (
    <>
      <div className='icons'>{tempStars}</div>
    </>
  );
};

export default IconsList;
