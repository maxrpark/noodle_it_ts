const products_reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_PRODUCTS_START':
      return {
        ...state,
        isProductsLoading: true,
      };
    case 'GET_PRODUCTS_SUCCESS':
      const noodles = action.payload;
      return {
        ...state,
        noodles: noodles,
        isProductsLoading: false,
      };
    case 'GET_PRODUCTS_ERROR':
      return {
        ...state,
        isProductsLoading: false,
      };
    // SINGLE_PRODUCT
    case 'GET_PRODUCT_START':
      return {
        ...state,
        noodle: {},
        isProductLoading: true,
      };
    case 'GET_PRODUCT_SUCCESS':
      const noodle = action.payload;
      return {
        ...state,
        noodle: noodle,
        isProductLoading: false,
      };
    case 'GET_PRODUCT_ERROR':
      return {
        ...state,
        isProductLoading: false,
      };
    default:
      return state;
  }
};

export default products_reducer;
