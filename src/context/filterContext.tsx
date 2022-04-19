import React, { useContext, useReducer, useEffect } from 'react';
import { useProductsContext, NoodleDetails } from './productsContext';
import filter_reducer from '../reducers/filter_reducer';

interface FilterContextInterface {
  noodles: NoodleDetails[];
  all_products: NoodleDetails[];
  filtered_products: NoodleDetails[];
}
const inicialState = {
  all_products: [] as NoodleDetails[],
  filtered_products: [] as NoodleDetails[],
};

const FilterContext = React.createContext({} as FilterContextInterface);

export const FilterProvider: React.FC = ({ children }) => {
  const { noodles } = useProductsContext();
  const [state, dispatch] = useReducer(filter_reducer, inicialState);

  useEffect(() => {
    console.log(noodles);
    dispatch({ type: 'GET_PRODUCTS', payload: noodles });
  }, [noodles]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
