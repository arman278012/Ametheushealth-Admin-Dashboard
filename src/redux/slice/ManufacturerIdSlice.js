import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufacturerId: null,
};

const manufacturerIdSlice = createSlice({
  name: "manufacturerIdSlice",
  initialState,
  reducers: {
    storeManufacturerId: (state, action) => {
      state.manufacturerId = action.payload;
    },
  },
});

export const { storeManufacturerId } = manufacturerIdSlice.actions;

export const selectManufacturerId = (state) =>
  state.manufacturerIdSlice.manufacturerId;

export default manufacturerIdSlice.reducer;
