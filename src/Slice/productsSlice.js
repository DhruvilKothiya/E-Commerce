import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { info } from "../Components/TokenGet";

// Fetch products list
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${info.access}`
        }
      }
      const { data } = await axios.get("/api/products/",config);
      console.log("data",data)
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.detail || "Something went wrong"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "productsList",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
