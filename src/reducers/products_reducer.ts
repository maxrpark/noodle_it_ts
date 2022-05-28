import { InitialState } from '../context/productsContext';
import { ActionType } from '../ts/states/action-types';
import { Actions } from '../ts/states/actions/products_actions';
import { NoodleDetails } from '../ts/interfaces/global_interfaces';
const products_reducer = (
  state: InitialState,
  action: Actions
): InitialState => {
  switch (action.type) {
    case ActionType.GET_PRODUCTS_START:
      return {
        ...state,
        isProductsLoading: true,
      };

    case ActionType.GET_CATEGORIES_LIST:
      const categoriesList = action.payload;
      return {
        ...state,
        noodlesCategoryList: categoriesList,
        isProductsLoading: false,
      };
    case ActionType.GET_BRAND_LIST:
      const noodlesBrandList = action.payload;

      return {
        ...state,
        noodlesBrandList: noodlesBrandList,
        isProductsLoading: false,
      };
    case ActionType.GET_PRODUCTS_SUCCESS:
      const noodles = action.payload;

      return {
        ...state,
        noodles: noodles,
        isProductsLoading: false,
      };
    case ActionType.GET_PRODUCTS_ERROR:
      return {
        ...state,
        isProductsLoading: false,
      };
    // SINGLE_PRODUCT
    case ActionType.GET_PRODUCT_START:
      return {
        ...state,
        noodle: {} as NoodleDetails,
        isProductLoading: true,
      };
    case ActionType.GET_PRODUCT_SUCCESS:
      const noodle = action.payload;
      return {
        ...state,
        noodle: noodle as NoodleDetails,
        isProductLoading: false,
      };
    case ActionType.GET_PRODUCT_ERROR:
      return {
        ...state,
        isProductLoading: false,
      };
    default:
      return state;
  }
};

export default products_reducer;
