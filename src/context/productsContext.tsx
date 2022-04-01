import React, { useContext, useReducer, useEffect } from 'react';
import products_reducer from '../reducers/products_reducer';
import axios from 'axios';
import { useFetch } from '../customHooks/useFetch';
import simplereview from 'simplereview';

interface Brand {
  name: string;
  slug: string;
}

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
  noodles: NoodleDetails[];
  isProductsLoading: boolean;
  noodle: NoodleDetails;
  isProductLoading: boolean;
  getSingleNoodle: (url: string) => void;
  getNoodles: (url: string) => void;
}

const initialState = {
  noodles: [] as NoodleDetails[],
  isProductsLoading: false,
  isProductsError: false,

  isProductLoading: false,
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
    } catch (err) {
      dispatch({ type: 'GET_PRODUCT_ERROR' });
    }
  };

  const baseUrl = 'https://noodles-api.herokuapp.com/api/v1/noodles/';
  useEffect(() => {
    getNoodles(baseUrl);
  }, []);

  useEffect(() => {}, []);
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        getNoodles,
        getSingleNoodle,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
