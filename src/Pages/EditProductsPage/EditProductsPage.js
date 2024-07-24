import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import EditProducts from "../../Components/EditProducts/EditProducts";

const EditProductsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <EditProducts />
      </div>
    </div>
  );
};

export default EditProductsPage;
