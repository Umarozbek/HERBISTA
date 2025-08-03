import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: {},  // Example: { 'foodId123': 2, 'foodId456': 1 }
  token: '',      // Auth token if needed
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.cartItems[id]) {
        state.cartItems[id] += 1;
      } else {
        state.cartItems[id] = 1;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.cartItems[id]; // completely removes the item from cart
    },

    decreaseCartItem: (state, action) => {
      const id = action.payload;
      if (state.cartItems[id] > 1) {
        state.cartItems[id] -= 1;
      } else {
        delete state.cartItems[id];
      }
    },

    clearCart: (state) => {
      state.cartItems = {};
    },

    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartItem,
  clearCart,
  setToken
} = cartSlice.actions;

export default cartSlice.reducer;



