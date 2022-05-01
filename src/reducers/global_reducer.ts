import { IGlobalState } from '../ts/states/global_state';

enum ActionType {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  OPEN_WITH_IMG = 'OPEN_WITH_IMG',
  COUPON_CODE = 'COUPON_CODE',
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
type Actions =
  | OPEN_MODAL_ACTION
  | CLOSE_MODAL_ACTION
  | OPEN_WITH_IMG
  | COUPON_CODE;

const global_reducer = (state: IGlobalState, action: Actions): IGlobalState => {
  switch (action.type) {
    case ActionType.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        // selectedImg: '',
      };
    case ActionType.OPEN_WITH_IMG:
      const img = action.payload;
      return {
        ...state,
        selectedImg: img,
        // isModalOpen: true,
      };
    case ActionType.COUPON_CODE:
      return {
        ...state,
        coupon_code: action.payload,
      };
    default:
      return state;
  }
};

export default global_reducer;
