// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}, // cartItems object
  deliveryCharge: 50, // adjust as needed
  currency: '$' // adjust as needed
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        state.items[itemId] += 1;
      } else {
        state.items[itemId] = 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId] && state.items[itemId] > 0) {
        state.items[itemId] -= 1;
        if (state.items[itemId] === 0) {
          delete state.items[itemId];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
    setDeliveryCharge: (state, action) => {
      state.deliveryCharge = action.payload;
    }
  }
});

// Selector functions
export const selectCartItems = (state) => state.cart.items;
export const selectDeliveryCharge = (state) => state.cart.deliveryCharge;
export const selectCurrency = (state) => state.cart.currency;

export const selectTotalCartAmount = (state) => {
  const cartItems = state.cart.items;
  const foodList = state.food.list;
  
  return Object.keys(cartItems).reduce((total, itemId) => {
    const item = foodList.find(food => food._id === itemId);
    if (item) {
      return total + (item.price * cartItems[itemId]);
    }
    return total;
  }, 0);
};

export const { addToCart, removeFromCart, clearCart, setDeliveryCharge } = cartSlice.actions;
export default cartSlice.reducer;