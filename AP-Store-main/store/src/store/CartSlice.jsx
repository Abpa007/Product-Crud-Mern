// src/store/CartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Hydrate cart from localStorage on app load
    hydrateCart: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += item.price;

      // Sync to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalQuantity", state.totalQuantity.toString());
      localStorage.setItem("totalAmount", state.totalAmount.toString());
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((i) => i._id !== id);
      }

      // Sync to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalQuantity", state.totalQuantity.toString());
      localStorage.setItem("totalAmount", state.totalAmount.toString());
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // Remove from localStorage
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalQuantity");
      localStorage.removeItem("totalAmount");
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
