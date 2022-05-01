import { IGlobalState } from '../ts/states/actions/global_state';
import { ActionType } from '../ts/states/action-types';
import { Actions } from '../ts/states/actions/global_state';

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
