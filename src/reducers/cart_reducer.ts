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
      return { ...state, total_items, total_amount };

    default:
      return state;
  }
};

export default cart_reducer;
