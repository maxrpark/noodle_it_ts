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
    default:
      return state;
  }
};

export default global_reducer;
