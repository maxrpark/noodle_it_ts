import React, { useContext, useReducer, useEffect } from 'react';
import { useProductsContext } from './productsContext';
import filter_reducer from '../reducers/filter_reducer';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import { ActionType } from '../ts/states/action-types';
export interface FilterInterface {
  text: string;
  brand: string;
  category: string;
  rating: string;
  min_price: number;
  max_price: number;
  price: number;
  spicy_level: string;
  tag: string;
}
interface FilterContextInterface {
  // noodles: NoodleDetails[];
  all_products: NoodleDetails[];
  filtered_products: NoodleDetails[];
  sort: string;
  updateFilters: (e: any) => void;
  updateSort: (e: any) => void;
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
    tag: 'all',
  },
  text: '',
};

export interface InicialState {
  all_products: NoodleDetails[];
  filtered_products: NoodleDetails[];
  sort: string;
  filters: FilterInterface;
  text: string;
}

const FilterContext = React.createContext({} as FilterContextInterface);

export const FilterProvider: React.FC = ({ children }) => {
  const { noodles } = useProductsContext();
  const [state, dispatch] = useReducer(
    filter_reducer,
    inicialState as InicialState
  );

  const updateSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: ActionType.UPDATE_SORT, payload: value });
  };

  const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value: string | number | null | undefined = e.target.value;

    if (name === 'category') {
      value = e.target.textContent;
    }

    if (name === 'price') {
      value = Number(value);
    }

    if (name === 'tag') {
      value = e.target.dataset.tag;
    }

    if (name === 'rating') {
      value = e.target.dataset.rating;
    }
    if (name === 'spicy_level') {
      value = e.target.dataset.spicy_level;
    }

    dispatch({ type: ActionType.UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: ActionType.CLEAR_FILTERS });
  };

  useEffect(() => {
    dispatch({ type: ActionType.FILTER_PRODUCTS });
    dispatch({ type: ActionType.SORT_PRODUCTS });
  }, [noodles, state.sort, state.filters]);

  useEffect(() => {
    dispatch({ type: ActionType.GET_PRODUCTS, payload: noodles });
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
