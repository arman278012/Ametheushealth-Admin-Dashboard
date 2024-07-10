import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import ProductDetails from "../../Components/ProductsDetails/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>
      <div className="w-[100%]">
        <ProductDetails />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
