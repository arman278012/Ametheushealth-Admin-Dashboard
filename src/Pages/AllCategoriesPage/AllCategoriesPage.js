import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllCategories from "../../Components/AllCategories/AllCategories";

const AllCategoriesPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AllCategories />
      </div>
    </div>
  );
};

export default AllCategoriesPage;
