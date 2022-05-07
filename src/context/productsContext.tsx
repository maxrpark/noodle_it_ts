import React, { useContext, useReducer, useEffect } from 'react';
import products_reducer from '../reducers/products_reducer';
import axios from 'axios';

import { NoodleDetails } from '../ts/interfaces/global_interfaces';
import { URL_NOODLES } from '../utils/variables';
import { ActionType } from '../ts/states/action-types';

import simpleSlider from '@maxcoding/simpleslider';
import simplereview from 'simplereview';

export interface List {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface ProductsInterface {
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

export interface InitialState {
  noodles: NoodleDetails[];
  isProductsLoading: boolean;
  isProductsError: boolean;

  noodlesBrandList: List[];
  noodlesCategoryList: List[];

  isProductLoading: boolean;
  isProductError: boolean;
  noodle: NoodleDetails | any; // fix
  related_by_category: NoodleDetails[];
  related_by_brand: NoodleDetails[];
}

const ProductsContext = React.createContext({} as ProductsInterface);

export const ProductsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    products_reducer,
    initialState as InitialState
  );

  const fetchUrlNoodles = `noodles/`;
  const fetchUrlBrand = `brand/list`;
  const fetchUrlCategory = `categories/list`;

  const fetchCategories = axios.get(URL_NOODLES + fetchUrlCategory);
  const fetchBrands = axios.get(URL_NOODLES + fetchUrlBrand);
  const fetchNoodles = axios.get(URL_NOODLES + fetchUrlNoodles);

  const getData = async () => {
    console.log('getData');

    dispatch({ type: ActionType.GET_PRODUCTS_START });
    Promise.all([fetchNoodles, fetchBrands, fetchCategories])
      .then(([res1, res2, res3]) => {
        const noodles = res1.data;
        dispatch({ type: ActionType.GET_PRODUCTS_SUCCESS, payload: noodles });
        const brandlist = res2.data;
        dispatch({ type: ActionType.GET_BRAND_LIST, payload: brandlist });

        const categoriesList = res3.data;
        dispatch({
          type: ActionType.GET_CATEGORIES_LIST,
          payload: categoriesList,
        });
      })
      .catch((err) => {
        dispatch({ type: ActionType.GET_PRODUCTS_ERROR });
        console.log(err);
      });
  };

  const getSingleNoodle = async (url: string) => {
    dispatch({ type: ActionType.GET_PRODUCT_START });
    try {
      const response = await axios.get(url);
      dispatch({
        type: ActionType.GET_PRODUCT_SUCCESS,
        payload: response.data,
      });
      simpleSlider();
      simplereview();
    } catch (err) {
      dispatch({ type: ActionType.GET_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
