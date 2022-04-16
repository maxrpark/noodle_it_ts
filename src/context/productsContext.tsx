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

export interface List {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
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
  URL_NOODLES: string;
  noodles: NoodleDetails[];
  isProductsLoading: boolean;
  noodle: NoodleDetails;
  noodlesBrandList: List[];
  noodlesCategoryList: List[];
  isProductLoading: boolean;
  getSingleNoodle: (url: string) => void;
}

const initialState = {
  noodles: [] as NoodleDetails[],
  isProductsLoading: true,
  isProductsError: false,

  noodlesBrandList: [],
  noodlesCategoryList: [],

  isProductLoading: true,
  isProductError: false,
  noodle: null as NoodleDetails | null,
  related_by_category: [] as NoodleDetails[],
  related_by_brand: [] as NoodleDetails[],
};

const ProductsContext = React.createContext({} as ProductContextInterface);

export const ProductsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, initialState);

  const fetchUrlNoodles = `noodles/`;
  const fetchUrlBrand = `brand/list`;
  const fetchUrlCategory = `categories/list`;

  const fetchCategories = axios.get(URL_NOODLES + fetchUrlCategory);
  const fetchBrands = axios.get(URL_NOODLES + fetchUrlBrand);
  const fetchNoodles = axios.get(URL_NOODLES + fetchUrlNoodles);

  const getData = async () => {
    dispatch({ type: 'GET_DATA_START' });
    Promise.all([fetchNoodles, fetchBrands, fetchCategories])
      .then(([res1, res2, res3]) => {
        const noodles = res1.data;
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: noodles });
        const brandlist = res2.data;
        dispatch({ type: 'GET_BRAND_LIST', payload: brandlist });

        const categoriesList = res3.data;
        dispatch({
          type: 'GET_CATEGORIES_LIST',
          payload: categoriesList,
        });
        console.log(state);
      })
      .catch((err) => {
        dispatch({ type: 'GET_PRODUCTS_ERROR' });
        console.log(err);
      });
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
    getData();
  }, []);

  useEffect(() => {}, []);
  return (
    <ProductsContext.Provider
      value={{
        ...state,
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
