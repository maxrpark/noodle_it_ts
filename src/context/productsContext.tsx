import React, { useContext, useReducer, useEffect } from 'react';
import products_reducer from '../reducers/products_reducer';
import axios from 'axios';

import { URL_NOODLES } from '../utils/variables';

import simpleSlider from '@maxcoding/simpleslider';
import simplereview from 'simplereview';
interface Brand {
  name: string;
  slug: string;
}

// const URL_NOODLES = 'https://noodles-api.herokuapp.com/api/v1/';

export interface NoodleDetails {
  id: number;
  name: string;
  images: string[];
  rating: number;
  slug: string;
  brand: Brand;
  category: string;
  price_per_package: string;
  price_per_unite: string;
  amount_per_package: number;
  description: string;
  ingredients: string[];
  tags: string[];
  instructions: string;
  spicy_level: string;
}

interface ProductContextInterface {
  URL_NOODLES: string;
  noodles: NoodleDetails[];
  isProductsLoading: boolean;
  noodle: NoodleDetails;
  isProductLoading: boolean;
  getSingleNoodle: (url: string) => void;
  getNoodles: (url: string) => void;
}

const initialState = {
  noodles: [] as NoodleDetails[],
  isProductsLoading: true,
  isProductsError: false,

  isProductLoading: true,
  isProductError: false,
  noodle: null as NoodleDetails | null,
  related_by_category: [] as NoodleDetails[],
  related_by_brand: [] as NoodleDetails[],
};

const ProductsContext = React.createContext({} as ProductContextInterface);

export const ProductsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, initialState);

  const getNoodles = async (url: string) => {
    dispatch({ type: 'GET_PRODUCTS_START' });
    try {
      const response = await axios.get(url);
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: response.data });
    } catch (err) {
      dispatch({ type: 'GET_PRODUCTS_ERROR' });
    }
  };

  const getSingleNoodle = async (url: string) => {
    dispatch({ type: 'GET_PRODUCT_START' });
    try {
      const response = await axios.get(url);
      dispatch({ type: 'GET_PRODUCT_SUCCESS', payload: response.data });
      simpleSlider();
      simplereview();
    } catch (err) {
      dispatch({ type: 'GET_PRODUCT_ERROR' });
    }
  };

  useEffect(() => {
    getNoodles(URL_NOODLES + 'noodles');
  }, []);

  useEffect(() => {}, []);
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        getNoodles,
        getSingleNoodle,
        URL_NOODLES,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
