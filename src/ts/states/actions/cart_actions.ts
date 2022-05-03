import { ActionType } from '../action-types';
import { NoodleDetails } from '../../interfaces/global_interfaces';

interface addTocard {
  noodle: NoodleDetails;
  id: string | number;
  amount: number;
}
interface toogleAmount {
  ID: string | number;
  value: string;
}

interface ADD_TO_CART {
  type: ActionType.ADD_TO_CART;
  payload: addTocard;
}
interface CLEAR_CART {
  type: ActionType.CLEAR_CART;
}
interface REMOVE_CART_ITEM {
  type: ActionType.REMOVE_CART_ITEM;
  payload: string | number;
}
interface TOGGLE_CART_ITEM_AMOUNT {
  type: ActionType.TOGGLE_CART_ITEM_AMOUNT;
  payload: toogleAmount;
}
interface COUNT_CART_TOTALS {
  type: ActionType.COUNT_CART_TOTALS;
}
interface CHECK_COUPON {
  type: ActionType.CHECK_COUPON;
  payload: string;
}

export type Actions =
  | ADD_TO_CART
  | CLEAR_CART
  | COUNT_CART_TOTALS
  | REMOVE_CART_ITEM
  | TOGGLE_CART_ITEM_AMOUNT
  | CHECK_COUPON;
