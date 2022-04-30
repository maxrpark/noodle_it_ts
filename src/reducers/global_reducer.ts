const global_reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        // selectedImg: '',
      };
    case 'OPEN_WITH_IMG':
      const img = action.payload;
      return {
        ...state,
        selectedImg: img,
        // isModalOpen: true,
      };
    case 'COUPON_CODE':
      return {
        ...state,
        coupon_code: action.payload,
      };
    default:
      return state;
  }
};

export default global_reducer;
