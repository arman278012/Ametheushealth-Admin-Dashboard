import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AttachProducts from "../../Components/AttachProducts/AttachProducts";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AttachProductsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AttachProducts />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AttachProducts />
        </div>
      </div>
    </>
  );
};

export default AttachProductsPage;
