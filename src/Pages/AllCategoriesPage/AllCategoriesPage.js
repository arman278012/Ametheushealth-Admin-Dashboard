import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllCategories from "../../Components/AllCategories/AllCategories";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllCategoriesPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AllCategories />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AllCategories />
        </div>
      </div>
    </>
  );
};

export default AllCategoriesPage;
