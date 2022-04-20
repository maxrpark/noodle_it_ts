import React, { useContext, useReducer, useEffect } from 'react';
import { useProductsContext, NoodleDetails } from './productsContext';
import filter_reducer from '../reducers/filter_reducer';

interface FilterInterface {
  text: string;
  brand: string;
  category: string;
  rating: string;
  min_price: number;
  max_price: number;
  price: number;
  spicy_level: string;
  tags: string;
}
interface FilterContextInterface {
  noodles: NoodleDetails[];
  all_products: NoodleDetails[];
  filtered_products: NoodleDetails[];
  sort: string;
  updateFilters: () => void;
  updateSort: () => void;
  clearFilters: () => void;
  text: string;
  filters: FilterInterface;
}
const inicialState = {
  all_products: [] as NoodleDetails[],
  filtered_products: [] as NoodleDetails[],
  sort: 'name-a',
  filters: {
    text: '',
    brand: 'all',
    category: 'all',
    rating: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    spicy_level: 'all',
    tags: 'all',
  },
  text: '',
};

const FilterContext = React.createContext({} as FilterContextInterface);

export const FilterProvider: React.FC = ({ children }) => {
  const { noodles } = useProductsContext();
  const [state, dispatch] = useReducer(filter_reducer, inicialState);

  const updateSort = (e: any) => {
    const value = e.target.value;
    dispatch({ type: 'UPDATE_SORT', payload: value });
  };

  const updateFilters = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'category') {
      value = e.target.textContent;
    }

    if (name === 'price') {
      value = Number(value);
    }

    dispatch({ type: 'UPDATE_FILTERS', payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  useEffect(() => {
    dispatch({ type: 'FILTER_PRODUCTS' });
    dispatch({ type: 'SORT_PRODUCTS' });
  }, [noodles, state.sort, state.filters]);

  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS', payload: noodles });
  }, [noodles]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
