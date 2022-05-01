import { ActionType } from '../action-types';

export interface IGlobalState {
  isModalOpen: boolean;
  selectedImg: string;
  coupon_code: string;
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
export type Actions =
  | OPEN_MODAL_ACTION
  | CLOSE_MODAL_ACTION
  | OPEN_WITH_IMG
  | COUPON_CODE;
