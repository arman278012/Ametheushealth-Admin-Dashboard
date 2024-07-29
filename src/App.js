import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import AddProductsPage from "./Pages/AddProductsPage/AddProductsPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AddCategoryPage from "./Pages/AddCategoryPage/AddCategoryPage";
import AllCategoriesPage from "./Pages/AllCategoriesPage/AllCategoriesPage";
import CategoryDataDetailsPage from "./Pages/CategoryDataDetailsPage/CategoryDataDetailsPage";
import { useContext } from "react";
import { AppContext } from "./Context/ContextProvider";
import EditCategoryForm from "./Components/EditCategoryForm/EditCategoryForm";
import CategorySubDetailsPage from "./Pages/CategorySubDetailsPage/CategorySubDetailsPage";
import AddGenericPage from "./Pages/AddGenericPage/AddGenericPage";
import AllGenericPage from "./Pages/AllGenericPage/AllGenericPage";
import EditGenericForm from "./Components/EditGenericForm/EditGenericForm";
import GenericDetailsPage from "./Pages/GenericDetailsPage/GenericDetailsPage";
import InstantGenericPage from "./Pages/InstantGenericPage/InstantGenericPage";
import EditProductsPage from "./Pages/EditProductsPage/EditProductsPage";
import AddManufacturerPage from "./Pages/AddManufacturerPage/AddManufacturerPage";
import AllManufacturersPage from "./Pages/AllManufacturersPage/AllManufacturersPage";
import EditManufacturers from "./Components/EditManufacturers/EditManufacturers";
import ManufacturerProductsPage from "./Pages/ManufacturerProductsPage/ManufacturerProductsPage";
import EditManufacturerProductsPage from "./Pages/EditManufacturerProductsPage/EditManufacturerProductsPage";
import InstantManufacturerPage from "./Pages/InstantManufacturerPage/InstantManufacturerPage";
import AttachCategoriesPage from "./Pages/AttachCategoriesPage/AttachCategoriesPage";
import AttachProductsPage from "./Pages/AttachProductsPage/AttachProductsPage";

function App() {
  const {
    editAllCattegoriesForm,
    setEditAllCategoriesForm,
    editGenericForm,
    setEditGenericForm,
    editManufacturerForm,
    setEditManufacturerForm,
  } = useContext(AppContext);

  return (
    <div className="App flex">
      <BrowserRouter>
        {/* <MySideBar /> */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/product-details" element={<ProductDetailsPage />} />
            <Route path="/add-product" element={<AddProductsPage />} />
            <Route path="/add-category" element={<AddCategoryPage />} />
            <Route path="/all-categories" element={<AllCategoriesPage />} />
            <Route
              path="/all-categories/:id"
              element={<CategoryDataDetailsPage />}
            />
            <Route
              path="/all-categories/:id/:sid"
              element={<CategorySubDetailsPage />}
            />
            <Route path="/add-generic" element={<AddGenericPage />} />
            <Route path="/all-generic" element={<AllGenericPage />} />
            <Route path="/generic-details" element={<GenericDetailsPage />} />
            <Route path="/instant-generic" element={<InstantGenericPage />} />
            <Route path="/edit-products/:id" element={<EditProductsPage />} />
            <Route path="/add-manufacturer" element={<AddManufacturerPage />} />
            <Route
              path="/all-manufacturers"
              element={<AllManufacturersPage />}
            />
            <Route
              path="/manufacturer-products"
              element={<ManufacturerProductsPage />}
            />
            <Route
              path="/edit-manufacturer-products/:id"
              element={<EditManufacturerProductsPage />}
            />
            <Route
              path="/instant-manufacturer"
              element={<InstantManufacturerPage />}
            />
            <Route
              path="/attach-categories"
              element={<AttachCategoriesPage />}
            />
            <Route path="/attach-products" element={<AttachProductsPage />} />
          </Routes>
          {editAllCattegoriesForm ? <EditCategoryForm /> : <></>}
          {editGenericForm ? <EditGenericForm /> : <></>}
          {editManufacturerForm ? <EditManufacturers /> : <></>}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
