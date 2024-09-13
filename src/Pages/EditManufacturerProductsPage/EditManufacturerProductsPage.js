import React from "react";
import EditManufacturerProducts from "../../Components/EditManufacturerProducts/EditManufacturerProducts";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const EditManufacturerProductsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <EditManufacturerProducts />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <EditManufacturerProducts />
        </div>
      </div>
    </>
  );
};

export default EditManufacturerProductsPage;
