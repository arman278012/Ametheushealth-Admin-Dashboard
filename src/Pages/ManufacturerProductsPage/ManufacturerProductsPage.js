import React from "react";
import ManufacturerProducts from "../../Components/ManufacturerProducts/ManufacturerProducts";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const ManufacturerProductsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <ManufacturerProducts />
        </div>
      </div>
      <div className="sm:hidden flex">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <ManufacturerProducts />
        </div>
      </div>
    </>
  );
};

export default ManufacturerProductsPage;
