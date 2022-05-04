import { ActionType } from '../action-types';

interface UpdateFiltersPayload {
  name: string;
  value: string | number | null | undefined;
}
interface GET_PRODUCTS {
  type: ActionType.GET_PRODUCTS;
  payload: any;
}
interface UPDATE_SORT {
  type: ActionType.UPDATE_SORT;
  payload: string;
}
interface SORT_PRODUCTS {
  type: ActionType.SORT_PRODUCTS;
}
interface UPDATE_FILTERS {
  type: ActionType.UPDATE_FILTERS;
  payload: UpdateFiltersPayload;
}
interface FILTER_PRODUCTS {
  type: ActionType.FILTER_PRODUCTS;
}
interface CLEAR_FILTERS {
  type: ActionType.CLEAR_FILTERS;
}

export type Actions =
  | GET_PRODUCTS
  | UPDATE_SORT
  | SORT_PRODUCTS
  | UPDATE_FILTERS
  | FILTER_PRODUCTS
  | CLEAR_FILTERS;
