import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddcategoryData = createAsyncThunk(
  "AddCategory/fetchAddcategoryData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/category/hierarchy-names`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      return response.data; // Return the fetched data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handle error
    }
  }
);

const AddCategorySlice = createSlice({
  name: "AddCategory",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    error: "",
  },
  reducers: {}, // Add any reducers if needed

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddcategoryData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAddcategoryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAddcategoryData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload; // Use action.payload for error message
      });
  },
});

export default AddCategorySlice.reducer;
