import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoryData = createAsyncThunk(
  "getCategoryData/fetchGetCategoryData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/category/?page=${4}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      return response.data; // Return the fetched data
    } catch (error) {
      return rejectWithValue(error.message); // Handle error
    }
  }
);

const initialState = {
  isLoading: false,
  allCategoryData: null,
  isError: false,
  error: "",
};

const getCategoryDataSlice = createSlice({
  name: "getCategoryData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCategoryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCategoryData = action.payload;
      })
      .addCase(getCategoryData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload; // Use action.payload for error message
      });
  },
});

export default getCategoryDataSlice.reducer; // Export the reducer
