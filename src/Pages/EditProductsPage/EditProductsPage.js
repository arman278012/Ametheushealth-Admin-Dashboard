import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import EditProducts from "../../Components/EditProducts/EditProducts";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const EditProductsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <EditProducts />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <EditProducts />
        </div>
      </div>
    </>
  );
};

export default EditProductsPage;
