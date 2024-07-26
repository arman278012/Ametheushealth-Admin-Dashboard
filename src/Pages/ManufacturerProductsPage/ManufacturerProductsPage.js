import React from "react";
import ManufacturerProducts from "../../Components/ManufacturerProducts/ManufacturerProducts";
import MySideBar from "../../Components/MySideBar/MySideBar";

const ManufacturerProductsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <ManufacturerProducts />
      </div>
    </div>
  );
};

export default ManufacturerProductsPage;
