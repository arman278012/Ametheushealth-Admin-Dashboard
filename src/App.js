import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./Context/ContextProvider";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import AddProductsPage from "./Pages/AddProductsPage/AddProductsPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AddCategoryPage from "./Pages/AddCategoryPage/AddCategoryPage";
import AllCategoriesPage from "./Pages/AllCategoriesPage/AllCategoriesPage";
import CategoryDataDetailsPage from "./Pages/CategoryDataDetailsPage/CategoryDataDetailsPage";
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
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage/OrderDetailsPage";
import SingleProductDetailsPage from "./Pages/SingleProductDetailsPage/SingleProductDetailsPage";
import AllContactsPage from "./Pages/AllContactsPage/AllContactsPage";
import ContactDetailsPage from "./Pages/ContactDetailsPage/ContactDetailsPage";
import AllPerscriptionPage from "./Pages/AllPerscriptionPage/AllPerscriptionPage";
import PrescriptiondetailsPage from "./Pages/PrescriptiondetailsPage/PrescriptiondetailsPage";
import AddBlogsPage from "./Pages/AddBlogsPage/AddBlogsPage";
import AllBlogsPage from "./Pages/AllBlogsPage/AllBlogsPage";
import EditBlogsPage from "./Pages/EditBlogsPage/EditBlogsPage";
import CreateOrderPage from "./Pages/CreateOrderPage/CreateOrderPage";
import AllusersPage from "./Pages/AllUsersPage/AllusersPage";
import UserDetailsPage from "./Pages/UserDetailsPage/UserDetailsPage";
import AddCouponsPage from "./Pages/AddCouponsPage/AddCouponsPage";
import AllCouponsPage from "./Pages/AllCouponsPage/AllCouponsPage";
import EditCoupons from "./Components/EditCoupons/EditCoupons";
import AddDoctorCategoryPage from "./Pages/AddDoctorCategoryPage/AddDoctorCategoryPage";
import AllDoctorCategoryPage from "./Pages/AllDoctorCategoryPage/AllDoctorCategoryPage";
import DoctorCategoryDetailsPage from "./Pages/DoctorCategoryDetailsPage/DoctorCategoryDetailsPage";
import EditDoctorCategoryPage from "./Pages/EditDoctorCategoryPage/EditDoctorCategoryPage";
import GetAllDoctorsPage from "./Pages/GetAllDoctorsPage/GetAllDoctorsPage";
import DoctorDetailsPage from "./Pages/DoctorDetailsPage/DoctorDetailsPage";
import OnboardingDoctorsPage from "./Pages/OnboarinngDoctorsPage/OnboarinngDoctorsPage";
import EditDoctorsDetailsPage from "./Pages/EditDoctorsDetailsPage/EditDoctorsDetailsPage";
import ApproveDoctor from "./Pages/ApproveDoctor/ApproveDoctor";
import OnBoardingDoctorsDetailsPage from "./Pages/OnBoardingDoctorsDetailsPage/OnBoardingDoctorsDetailsPage";

function App() {
  const {
    editAllCattegoriesForm,
    editGenericForm,
    editManufacturerForm,
    editCouponForm,
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
              path="/edit-products/:id/"
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

            <Route
              path="/orders"
              element={<AdminRoute element={OrdersPage} />}
            />

            <Route
              path="/orders-details/:id"
              element={<AdminRoute element={OrderDetailsPage} />}
            />

            <Route
              path="/product-details/:id"
              element={<AdminRoute element={SingleProductDetailsPage} />}
            />

            <Route
              path="/all-contacts"
              element={<AdminRoute element={AllContactsPage} />}
            />

            <Route
              path="/contact-details/:id"
              element={<AdminRoute element={ContactDetailsPage} />}
            />

            <Route
              path="/all-persciption"
              element={<AdminRoute element={AllPerscriptionPage} />}
            />

            <Route
              path="/precription-details/:id"
              element={<AdminRoute element={PrescriptiondetailsPage} />}
            />

            <Route
              path="/add-blogs"
              element={<AdminRoute element={AddBlogsPage} />}
            />

            <Route
              path="/show-blogs"
              element={<AdminRoute element={AllBlogsPage} />}
            />

            <Route
              path="/edit-blogs/:id"
              element={<AdminRoute element={EditBlogsPage} />}
            />

            <Route
              path="/create-order"
              element={<AdminRoute element={CreateOrderPage} />}
            />
            <Route
              path="/all-users"
              element={<AdminRoute element={AllusersPage} />}
            />
            <Route
              path="/all-users/:id"
              element={<AdminRoute element={UserDetailsPage} />}
            />
            <Route
              path="/add-coupons"
              element={<AdminRoute element={AddCouponsPage} />}
            />
            <Route
              path="/all-coupons"
              element={<AdminRoute element={AllCouponsPage} />}
            />
            <Route
              path="/add-doctor-category"
              element={<AdminRoute element={AddDoctorCategoryPage} />}
            />
            <Route
              path="/all-doctor-category"
              element={<AdminRoute element={AllDoctorCategoryPage} />}
            />
            <Route
              path="/all-doctor-category/:id"
              element={<AdminRoute element={DoctorCategoryDetailsPage} />}
            />
            <Route
              path="/all-doctor-category/edit/:id"
              element={<AdminRoute element={EditDoctorCategoryPage} />}
            />
            <Route
              path="/all-doctor"
              element={<AdminRoute element={GetAllDoctorsPage} />}
            />
            <Route
              path="/all-doctor/:id"
              element={<AdminRoute element={DoctorDetailsPage} />}
            />
            <Route
              path="/all-onboarding-doctors"
              element={<AdminRoute element={OnboardingDoctorsPage} />}
            />
            <Route
              path="/all-doctor/edit/:id"
              element={<AdminRoute element={EditDoctorsDetailsPage} />}
            />
            <Route
              path="/all-doctor/approve"
              element={<AdminRoute element={ApproveDoctor} />}
            />
            <Route
              path="/onboarding-doctors/:id"
              element={<AdminRoute element={OnBoardingDoctorsDetailsPage} />}
            />
          </Routes>
          {editAllCattegoriesForm ? <EditCategoryForm /> : <></>}
          {editGenericForm ? <EditGenericForm /> : <></>}
          {editManufacturerForm ? <EditManufacturers /> : <></>}
          {editCouponForm ? <EditCoupons /> : <></>}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
