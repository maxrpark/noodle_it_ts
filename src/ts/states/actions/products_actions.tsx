import { ActionType } from '../action-types';
import { NoodleDetails } from '../../interfaces/global_interfaces';
import { List } from '../../../context/productsContext';

interface GET_PRODUCTS_START {
  type: ActionType.GET_PRODUCTS_START;
}
interface GET_CATEGORIES_LIST {
  type: ActionType.GET_CATEGORIES_LIST;
  payload: List[];
}
interface GET_BRAND_LIST {
  type: ActionType.GET_BRAND_LIST;
  payload: List[];
}
interface GET_PRODUCTS_SUCCESS {
  type: ActionType.GET_PRODUCTS_SUCCESS;
  payload: NoodleDetails[];
}
interface GET_PRODUCTS_ERROR {
  type: ActionType.GET_PRODUCTS_ERROR;
  payload?: boolean;
}
interface GET_PRODUCT_START {
  type: ActionType.GET_PRODUCT_START;
  payload?: any | boolean;
}
interface GET_PRODUCT_SUCCESS {
  type: ActionType.GET_PRODUCT_SUCCESS;
  payload: NoodleDetails | boolean;
}
interface GET_PRODUCT_ERROR {
  type: ActionType.GET_PRODUCT_ERROR;
  payload?: any;
}
export type Actions =
  | GET_PRODUCTS_START
  | GET_CATEGORIES_LIST
  | GET_BRAND_LIST
  | GET_PRODUCTS_SUCCESS
  | GET_PRODUCTS_ERROR
  | GET_PRODUCT_START
  | GET_PRODUCT_SUCCESS
  | GET_PRODUCT_ERROR;
