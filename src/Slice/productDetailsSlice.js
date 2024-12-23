import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { info } from "../Components/TokenGet";

// Fetch individual product details
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          
          Authorization: `Bearer ${info.token}`
        }
      }
      const { data } = await axios.get(`/api/product/${id}`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.detail || "Product not found");
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
