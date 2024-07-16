import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genericId: null,
};

const genericIdSlice = createSlice({
  name: "genericIdSlice",
  initialState,
  reducers: {
    storeGenericId: (state, action) => {
      state.genericId = action.payload;
    },
  },
});

export const { storeGenericId } = genericIdSlice.actions;

export const selectGenericId = (state) => state.genericIdSlice.genericId;

export default genericIdSlice.reducer;
