import { ActionType } from '../ts/states/action-types';
import { Actions } from '../ts/states/actions/global_actions';
import { InicialState } from '../context/globalContext';

const global_reducer = (state: InicialState, action: Actions): InicialState => {
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
    case ActionType.SEARCH_START:
      return {
        ...state,
        query: action.payload,
        isLoading: true,
      };
    case ActionType.SEARCH_RESULT:
      const { query, result } = action.payload;
      return {
        ...state,
        query: query,
        result: result,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default global_reducer;
