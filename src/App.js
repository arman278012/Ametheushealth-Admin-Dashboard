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
import AdminRoute from "./Components/AdminRoute/AdminRoute";
import AttachManufacturerPage from "./Pages/AttachManufacturerPage/AttachManufacturerPage";
import AttachGenericPage from "./Pages/AttachGenericPage/AttachGenericPage";

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
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={<AdminRoute element={ProductDetailsPage} />}
            />
            <Route
              path="/product-details"
              element={<AdminRoute element={ProductDetailsPage} />}
            />
            <Route
              path="/add-product"
              element={<AdminRoute element={AddProductsPage} />}
            />
            <Route
              path="/add-category"
              element={<AdminRoute element={AddCategoryPage} />}
            />
            <Route
              path="/all-categories"
              element={<AdminRoute element={AllCategoriesPage} />}
            />
            <Route
              path="/all-categories/:id"
              element={<AdminRoute element={CategoryDataDetailsPage} />}
            />
            <Route
              path="/all-categories/:id/:sid"
              element={<AdminRoute element={CategorySubDetailsPage} />}
            />
            <Route
              path="/add-generic"
              element={<AdminRoute element={AddGenericPage} />}
            />
            <Route
              path="/all-generic"
              element={<AdminRoute element={AllGenericPage} />}
            />
            <Route
              path="/generic-details"
              element={<AdminRoute element={GenericDetailsPage} />}
            />
            <Route
              path="/instant-generic"
              element={<AdminRoute element={InstantGenericPage} />}
            />
            <Route
              path="/edit-products/:id"
              element={<AdminRoute element={EditProductsPage} />}
            />
            <Route
              path="/add-manufacturer"
              element={<AdminRoute element={AddManufacturerPage} />}
            />
            <Route
              path="/all-manufacturers"
              element={<AdminRoute element={AllManufacturersPage} />}
            />
            <Route
              path="/manufacturer-products"
              element={<AdminRoute element={ManufacturerProductsPage} />}
            />
            <Route
              path="/edit-manufacturer-products/:id"
              element={<AdminRoute element={EditManufacturerProductsPage} />}
            />
            <Route
              path="/instant-manufacturer"
              element={<AdminRoute element={InstantManufacturerPage} />}
            />
            <Route
              path="/attach-categories"
              element={<AdminRoute element={AttachCategoriesPage} />}
            />
            <Route
              path="/attach-products"
              element={<AdminRoute element={AttachProductsPage} />}
            />
            <Route
              path="/attach-manufacturer"
              element={<AdminRoute element={AttachManufacturerPage} />}
            />

            <Route
              path="/attach-generic"
              element={<AdminRoute element={AttachGenericPage} />}
            />
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
