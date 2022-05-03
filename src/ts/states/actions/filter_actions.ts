import { ActionType } from '../action-types';
import { NoodleDetails } from '../../interfaces/global_interfaces';

interface GetProduct {
  noodle: NoodleDetails;
  all_products: NoodleDetails[];
  // filtered_products;
}
interface GET_PRODUCTS {
  type: ActionType.GET_PRODUCTS;
  payload: any;
}
interface UPDATE_SORT {
  type: ActionType.UPDATE_SORT;
  payload?: any;
}
interface SORT_PRODUCTS {
  type: ActionType.SORT_PRODUCTS;
}
interface UPDATE_FILTERS {
  type: ActionType.UPDATE_FILTERS;
  payload?: any;
}
interface FILTER_PRODUCTS {
  type: ActionType.FILTER_PRODUCTS;
  payload?: any;
}
interface CLEAR_FILTERS {
  type: ActionType.CLEAR_FILTERS;
  payload?: any;
}

export type Actions =
  | GET_PRODUCTS
  | UPDATE_SORT
  | SORT_PRODUCTS
  | UPDATE_FILTERS
  | FILTER_PRODUCTS
  | CLEAR_FILTERS;
