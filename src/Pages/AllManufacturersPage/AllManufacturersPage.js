import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllManufacturers from "../../Components/AllManufacturers/AllManufacturers";

const AllManufacturersPage = () => {
  return (
    <div className="flex">
      <div className="">
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AllManufacturers />
      </div>
    </div>
  );
};

export default AllManufacturersPage;
