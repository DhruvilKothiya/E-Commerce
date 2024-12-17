import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import userReducer from "../Slice/userSlice";
import productsReducer from "../Slice/productsSlice";
import cartReducer from "../Slice/cartSlice";
import productDetailsReducer from "../Slice/productDetailsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    productsList: productsReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
