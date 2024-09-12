import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  couponId: null,
};

const couponIdSlice = createSlice({
  name: "couponIdSlice",
  initialState,
  reducers: {
    storeCouponId: (state, action) => {
      state.couponId = action.payload;
    },
  },
});

export const { storeCouponId } = couponIdSlice.actions;

export const selectCouponId = (state) => state.couponIdSlice.couponId;

export default couponIdSlice.reducer;
