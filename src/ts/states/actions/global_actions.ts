import { NoodleDetails } from '../../interfaces/global_interfaces';
import { ActionType } from '../action-types';

interface SearchResultActionInt {
  query: string;
  result: NoodleDetails[];
}
interface OPEN_MODAL_ACTION {
  type: ActionType.OPEN_MODAL;
}
interface CLOSE_MODAL_ACTION {
  type: ActionType.CLOSE_MODAL;
}
interface OPEN_WITH_IMG {
  type: ActionType.OPEN_WITH_IMG;
  payload: string;
}
interface COUPON_CODE {
  type: ActionType.COUPON_CODE;
  payload: string;
}
interface SEARCH_RESULT {
  type: ActionType.SEARCH_RESULT;
  payload: SearchResultActionInt;
}
interface SEARCH_START {
  type: ActionType.SEARCH_START;
  payload: string;
}
interface NO_RESULT_FOUND {
  type: ActionType.NO_RESULT_FOUND;
}
export type Actions =
  | OPEN_MODAL_ACTION
  | CLOSE_MODAL_ACTION
  | OPEN_WITH_IMG
  | SEARCH_RESULT
  | SEARCH_START
  | NO_RESULT_FOUND
  | COUPON_CODE;
