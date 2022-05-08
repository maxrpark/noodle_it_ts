import React from 'react';
import { List } from '../context/productsContext';
type Props = {
  noodles: List[];
};

const GridLayoutOne: React.FC<Props> = ({ noodles }) => {
  return <div>GridLayoutOne</div>;
};

export default GridLayoutOne;
