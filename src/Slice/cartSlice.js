import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { info } from "../Components/TokenGet";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Async thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
  "cart/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${info.access}`,
        },
      };
      const { data } = await axios.get(`/api/product/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existingItem.product
            ? { ...existingItem, qty: item.qty }
            : x
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
    },
    updateCartQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const existingItem = state.cartItems.find((x) => x.product === id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === id ? { ...x, qty } : x
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload;

        // Add the product with default qty = 1
        const existingItem = state.cartItems.find(
          (x) => x.product === product.id
        );
        if (existingItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === product.id
              ? { ...existingItem, qty: existingItem.qty + 1 }
              : x
          );
        } else {
          state.cartItems.push({
            product: product.id,
            productname: product.productname,
            image: product.images[0]?.image || "",
            price: product.price,
            stockcount: product.stockcount,
            qty: 1,
          });
        }
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
