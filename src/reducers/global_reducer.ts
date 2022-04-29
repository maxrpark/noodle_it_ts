const global_reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'IS_MODAL_OPEN':
      return {
        ...state,
        isModalOpen: false,
        selectedImg: '',
      };
    case 'OPEN_WITH_IMG':
      const img = action.payload;
      return {
        ...state,
        selectedImg: img,
        isModalOpen: true,
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
