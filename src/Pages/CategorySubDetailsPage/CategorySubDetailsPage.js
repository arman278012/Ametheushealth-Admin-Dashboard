import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import CategorySubDetails from "../../Components/CategorySubDetails/CategorySubDetails";

const CategorySubDetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <CategorySubDetails />
      </div>
    </div>
  );
};

export default CategorySubDetailsPage;
