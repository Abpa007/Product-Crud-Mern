// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import adminOrderReducer from "./adminOrderSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    adminOrders: adminOrderReducer,
    auth: authReducer,
  },
});

export default store;
