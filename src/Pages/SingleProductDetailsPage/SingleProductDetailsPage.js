import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import SingleProductDetails from "../../Components/SingleProductDetails/SingleProductDetails";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const SingleProductDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <SingleProductDetails />
        </div>
      </div>
      <div className="sm:hidden flex">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <SingleProductDetails />
        </div>
      </div>
    </>
  );
};

export default SingleProductDetailsPage;
