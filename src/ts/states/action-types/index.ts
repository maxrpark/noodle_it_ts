export enum ActionType {
  // global_actions
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  OPEN_WITH_IMG = 'OPEN_WITH_IMG',
  COUPON_CODE = 'COUPON_CODE',
  SEARCH_START = 'SEARCH_START',
  SEARCH_RESULT = 'SEARCH_RESULT',
  NO_RESULT_FOUND = 'NO_RESULT_FOUND',

  // prooducts_actions
  GET_PRODUCTS_START = 'GET_PRODUCTS_START',
  GET_CATEGORIES_LIST = 'GET_CATEGORIES_LIST',
  GET_BRAND_LIST = 'GET_BRAND_LIST',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR',
  GET_PRODUCT_START = 'GET_PRODUCT_START',
  GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR',

  // filter_reducer
  GET_PRODUCTS = 'GET_PRODUCTS',
  UPDATE_SORT = 'UPDATE_SORT',
  SORT_PRODUCTS = 'SORT_PRODUCTS',
  UPDATE_FILTERS = 'UPDATE_FILTERS',
  FILTER_PRODUCTS = 'FILTER_PRODUCTS',
  CLEAR_FILTERS = 'CLEAR_FILTERS',

  // cart_reducer
  ADD_TO_CART = 'ADD_TO_CART',
  CLEAR_CART = 'CLEAR_CART',
  REMOVE_CART_ITEM = 'REMOVE_CART_ITEM',
  TOGGLE_CART_ITEM_AMOUNT = 'TOGGLE_CART_ITEM_AMOUNT',
  COUNT_CART_TOTALS = 'COUNT_CART_TOTALS',
  CHECK_COUPON = 'CHECK_COUPON',

  // user_reducer
  LOG_IN = 'LOG_IN',
  GET_USER_DETAILS = 'GET_USER_DETAILS',
  LOG_BACK = 'LOG_BACK',
  TOOGLE_FORM = 'TOOGLE_FORM',
  LOG_OUT_USER = 'LOG_OUT_USER',
  GET_FAVORITES_NOODLES = 'GET_FAVORITES_NOODLES',
  IS_USER_FAVORITE_NOODLE = 'IS_USER_FAVORITE_NOODLE',
  SET_USER_FAVORITES_NOODLE = 'SET_USER_FAVORITES_NOODLE',
  LOAD_NOODLES = 'LOAD_NOODLES',
}
