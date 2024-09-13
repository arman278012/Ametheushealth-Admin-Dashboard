import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AttachCategories from "../../Components/AttachCategories/AttachCategories";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AttachCategoriesPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AttachCategories />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AttachCategories />
        </div>
      </div>
    </>
  );
};

export default AttachCategoriesPage;
