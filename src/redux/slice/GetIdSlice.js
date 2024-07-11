import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeId: null,
};

const idSlice = createSlice({
  name: "idSlice",
  initialState,
  reducers: {
    storeMyId: (state, action) => {
      state.storeId = action.payload;
    },
  },
});

export const { storeMyId } = idSlice.actions;

export const selectStoredId = (state) => state.idSlice.storeId;

export default idSlice.reducer;
