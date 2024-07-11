import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import Addproduct from "../../Components/AddProduct/Addproduct";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AddProductsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <Addproduct />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar/>
        </div>
        <div className="w-[100%]">
          <Addproduct />
        </div>
      </div>
    </>
  );
};

export default AddProductsPage;
