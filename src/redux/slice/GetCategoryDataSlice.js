import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoryData = createAsyncThunk(
  "getCategoryData/fetchGetCategoryData",
  async ({ page, searchQuery, pageLimit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/category/?page=${page}&search=${searchQuery}&limit=${pageLimit}`,
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
  currentPage: 1,
  searchQuery: "",
};

const getCategoryDataSlice = createSlice({
  name: "getCategoryData",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
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

export const { setPage, setSearchQuery } = getCategoryDataSlice.actions;
export default getCategoryDataSlice.reducer;
