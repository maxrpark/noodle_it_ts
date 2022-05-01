const cart_reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { id, amount, noodle } = action.payload;
      const tempItem = state.cart.find((i: any) => i.id === id);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem: any) => {
          if (cartItem.id === id) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });

        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id,
          name: noodle.name,
          amount,
          image: noodle.images[0],
          price: noodle.price_per_package,
          brand: noodle.brand.name,
          category: noodle.category,
          rating: noodle.rating,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'REMOVE_CART_ITEM':
      const tempCartState = state.cart.filter(
        (item: any) => item.id !== action.payload
      );
      return { ...state, cart: tempCartState };

    case 'TOGGLE_CART_ITEM_AMOUNT':
      const { ID, value } = action.payload;
      const tempCart = state.cart.map((item: any) => {
        if (item.id === ID) {
          console.log(ID);
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });

      return { ...state, cart: tempCart };

    case 'COUNT_CART_TOTALS':
      const { total_items, total_amount } = state.cart.reduce(
        (total: any, cartItem: any) => {
          const { amount, price } = cartItem;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );

      let user_discount = (state.discount / 100) * total_amount;
      let total_amount_WD = total_amount - user_discount;

      return {
        ...state,
        total_items,
        total_amount,
        total_with_discount: total_amount_WD,
      };

    case 'CHECK_COUPON':
      let discount_value = 0;
      if (action.payload === 'NOODLE_IT_BUY_NOW') {
        discount_value = 10;
      } else if (action.payload === 'NOODLE_IT_ON_FIRE') {
        discount_value = 20;
      } else if (action.payload === 'NOODLE_IT_CRAZY_DAYS') {
        discount_value = 30;
      }

      let current_discount = (discount_value / 100) * state.total_amount;
      let total_amount_with_discount = state.total_amount - current_discount;

      return {
        ...state,
        discount: discount_value,
        has_discount: true,
        total_with_discount: total_amount_with_discount,
      };

    default:
      return state;
  }
};

export default cart_reducer;
