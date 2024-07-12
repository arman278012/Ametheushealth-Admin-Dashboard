import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import ProductDetails from "../../Components/ProductsDetails/ProductDetails";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const ProductDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <ProductDetails />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>
        <div className="w-[100%]">
          <ProductDetails />
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
