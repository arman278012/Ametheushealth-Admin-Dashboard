import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetProductsData = createAsyncThunk(
  "GetProducts/fetchGetProductsData",
  async ({ page, searchQuery, pageLimit }, { rejectWithValue }) => {
    searchQuery = encodeURIComponent(searchQuery);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/product/admin/?page=${page}&limit=${pageLimit}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log("slice response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message); // Handle error
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
  pageLimit: 10, // Set a default value for page limit
};

const getProductsSlice = createSlice({
  name: "getProductsData",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageLimit: (state, action) => {
      state.pageLimit = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
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

export const { setPage, setPageLimit, setSearchQuery } =
  getProductsSlice.actions;
export default getProductsSlice.reducer;
