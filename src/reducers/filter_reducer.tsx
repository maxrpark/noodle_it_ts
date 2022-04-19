const filter_reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      const noodles = action.payload;
      console.log(noodles);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      };
    default:
      return state;
  }
};

export default filter_reducer;
