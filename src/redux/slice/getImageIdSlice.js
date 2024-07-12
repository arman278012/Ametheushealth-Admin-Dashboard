import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeImageId: null,
};

const imageIdSlice = createSlice({
  name: "imageIdSlice",
  initialState,
  reducers: {
    storeMyImageId: (state, action) => {
      state.storeImageId = action.payload;
    },
  },
});

export const { storeMyImageId } = imageIdSlice.actions;

export const selectMyImageId = (state) => state.imageIdSlice.payload;

export default imageIdSlice.reducer;
