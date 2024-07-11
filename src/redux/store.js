import { configureStore } from "@reduxjs/toolkit";
import AddCategoryReducer from "./slice/AddCategorySlice";
import getCategoryDataReducer from "./slice/GetCategoryDataSlice";
import idReducer from "./slice/GetIdSlice";
import { thunk } from "redux-thunk"; // Correct import statement for redux-thunk

export const store = configureStore({
  reducer: {
    AddCategory: AddCategoryReducer,
    getCategoryData: getCategoryDataReducer,
    idSlice: idReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
});

export default store;
