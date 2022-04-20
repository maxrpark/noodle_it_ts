const filter_reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      let maxPrice = action.payload.map((p: any) => p.price_per_package);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case 'UPDATE_SORT':
      return { ...state, sort: action.payload };

    case 'SORT_PRODUCTS':
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.price_per_package < b.price_per_package) {
            return -1;
          }
          if (a.price_per_package > b.price_per_package) {
            return 1;
          }
          return 0;
        });
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempProducts };

    case 'UPDATE_FILTERS':
      const { name, value } = action.payload;

      return { ...state, filters: { ...state.filters, [name]: value } };

    case 'FILTER_PRODUCTS':
      const { all_products } = state;
      const { text, category, brand, rating, price } = state.filters;
      let tempFilteredProducts = [...all_products];
      // search
      if (text) {
        tempFilteredProducts = tempFilteredProducts.filter((noodle) => {
          return (
            noodle.name.toLowerCase().startsWith(text) ||
            noodle.brand.name.toLowerCase().startsWith(text) ||
            noodle.category.toLowerCase().startsWith(text)
          );
        });
      }
      // category
      if (category !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter(
          (noodle) => noodle.category === category
        );
      }

      // company
      if (brand !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter(
          (noodle) => noodle.brand.name === brand
        );
      }
      // price
      tempFilteredProducts = tempFilteredProducts.filter(
        (noodle) => noodle.price_per_package <= price
      );

      return { ...state, filtered_products: tempFilteredProducts };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      return state;
  }
};

export default filter_reducer;
