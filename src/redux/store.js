import { configureStore } from "@reduxjs/toolkit";
import AddCategoryReducer from "./slice/AddCategorySlice";
import getCategoryDataReducer from "./slice/GetCategoryDataSlice";
import idReducer from "./slice/GetIdSlice";
import imageIdReducer from "./slice/getImageIdSlice";
import genericIdReducer from "./slice/GetGenericIdSlice";
import couponIdReducer from "./slice/GetCouponIdSlice"; // Correct the import here
import getProductReducer from "./slice/GetProductsSlice";
import manufacturerReducer from "./slice/ManufacturerIdSlice";

import { thunk } from "redux-thunk"; // Fix the import

export const store = configureStore({
  reducer: {
    AddCategory: AddCategoryReducer,
    getCategoryData: getCategoryDataReducer,
    idSlice: idReducer,
    imageIdSlice: imageIdReducer,
    genericIdSlice: genericIdReducer,
    couponIdSlice: couponIdReducer, // Correct the reducer here
    getproductsSlice: getProductReducer,
    manufacturerIdSlice: manufacturerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
