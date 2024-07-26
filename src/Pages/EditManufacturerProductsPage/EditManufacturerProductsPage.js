import React from "react";
import EditManufacturerProducts from "../../Components/EditManufacturerProducts/EditManufacturerProducts";
import MySideBar from "../../Components/MySideBar/MySideBar";

const EditManufacturerProductsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <EditManufacturerProducts />
      </div>
    </div>
  );
};

export default EditManufacturerProductsPage;
