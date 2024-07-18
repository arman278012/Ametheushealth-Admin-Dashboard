import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetProductsData = createAsyncThunk(
  "GetProducts/fetchGetProductsData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://api.assetorix.com:4100/ah/api/v1/category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  allProductsData: null,
  isError: false,
  error: "",
  currentPage: 1,
  searchQuery: "",
};

const getProductsSlice = createSlice({
  name: "getProductsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetProductsData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGetProductsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProductsData = action.payload;
    });
    builder.addCase(fetchGetProductsData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export default getProductsSlice.reducer;
