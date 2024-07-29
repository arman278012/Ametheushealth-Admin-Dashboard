import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AttachCategories from "../../Components/AttachCategories/AttachCategories";

const AttachCategoriesPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AttachCategories />
        </div>
      </div>
    </>
  );
};

export default AttachCategoriesPage;
