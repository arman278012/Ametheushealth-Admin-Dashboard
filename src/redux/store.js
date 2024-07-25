import { configureStore } from "@reduxjs/toolkit";
import AddCategoryReducer from "./slice/AddCategorySlice";
import getCategoryDataReducer from "./slice/GetCategoryDataSlice";
import idReducer from "./slice/GetIdSlice";
import imageIdReducer from "./slice/getImageIdSlice";
import genericIdReducer from "./slice/GetGenericIdSlice";
import getProductReducer from "./slice/GetProductsSlice";
import manufacturerReducer from "./slice/ManufacturerIdSlice";
import { thunk } from "redux-thunk"; // Correct import statement for redux-thunk

export const store = configureStore({
  reducer: {
    AddCategory: AddCategoryReducer,
    getCategoryData: getCategoryDataReducer,
    idSlice: idReducer,
    imageIdSlice: imageIdReducer,
    genericIdSlice: genericIdReducer,
    getproductsSlice: getProductReducer,
    manufacturerIdSlice: manufacturerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
});

export default store;
