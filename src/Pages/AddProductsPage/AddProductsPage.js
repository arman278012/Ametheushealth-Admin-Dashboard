import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import Addproduct from "../../Components/AddProduct/Addproduct";

const AddProductsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>
      <div className="w-[100%]">
        <Addproduct />
      </div>
    </div>
  );
};

export default AddProductsPage;
