import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import AddProductsPage from "./Pages/AddProductsPage/AddProductsPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AddCategoryPage from "./Pages/AddCategoryPage/AddCategoryPage";
import AllCategoriesPage from "./Pages/AllCategoriesPage/AllCategoriesPage";
import CategoryDataDetailsPage from "./Pages/CategoryDataDetailsPage/CategoryDataDetailsPage";

function App() {
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
