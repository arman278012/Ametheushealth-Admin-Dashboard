import React from "react";
import CategoryDataDetails from "../../Components/CategoryDataDetails/CategoryDataDetails";
import MySideBar from "../../Components/MySideBar/MySideBar";

const CategoryDataDetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <CategoryDataDetails/>
      </div>
    </div>
  );
};

export default CategoryDataDetailsPage;
