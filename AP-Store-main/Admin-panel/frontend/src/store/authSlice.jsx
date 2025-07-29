import { createSlice } from "@reduxjs/toolkit";

// Load admin info from localStorage if available
const adminInfoFromStorage = JSON.parse(localStorage.getItem("adminInfo"));

const initialState = {
  adminInfo: adminInfoFromStorage || null, // { name, email, isAdmin, token }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { setAdminCredentials, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
