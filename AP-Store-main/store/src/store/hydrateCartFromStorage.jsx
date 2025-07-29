// store/hydrateCartFromStorage.js
import { addToCart } from "./CartSlice";

export const hydrateCartFromStorage = (dispatch) => {
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  storedCartItems.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      dispatch(addToCart(item));
    }
  });
};
