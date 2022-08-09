import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CartSlice";
import modalReducer from "./features/modal/ModalSlice";

export const store = configureStore({
  //reducerを指定
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});
