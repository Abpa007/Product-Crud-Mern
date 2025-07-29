import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import orderReducer from "./OrderSlice";
import authReducer from "./authSlice"; // ✅
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    // ✅
  },
});
