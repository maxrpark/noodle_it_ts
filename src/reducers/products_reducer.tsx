const products_reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_PRODUCTS_START':
      console.log('GET_PRODUCTS');
      return {
        ...state,
        isProductsLoading: true,
      };
    case 'GET_PRODUCTS_SUCCESS':
      console.log('GET_PRODUCTS_SUCCESS');
      const noodles = action.payload;
      return {
        ...state,
        isProductsLoading: false,
        noodles,
      };
    case 'GET_PRODUCTS_ERROR':
      console.log('GET_PRODUCTS_ERROR');
      // const noodles = action.payload;
      return {
        ...state,
        isProductsLoading: false,
        noodles,
      };
    // SINGLE_PRODUCT
    case 'GET_PRODUCT_START':
      console.log('GET_PRODUCT');
      return {
        ...state,
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
      console.log('GET_PRODUCT_ERROR');
      return {
        ...state,
        isProductLoading: false,
      };
    default:
      return state;
  }
};

export default products_reducer;
