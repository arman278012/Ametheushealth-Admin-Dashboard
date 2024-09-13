import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllManufacturers from "../../Components/AllManufacturers/AllManufacturers";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllManufacturersPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div className="">
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AllManufacturers />
        </div>
      </div>

      <div className="sm:hidden block">
        <div className="">
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AllManufacturers />
        </div>
      </div>
    </>
  );
};

export default AllManufacturersPage;
