import React from "react";
import CategoryDataDetails from "../../Components/CategoryDataDetails/CategoryDataDetails";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const CategoryDataDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <CategoryDataDetails />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <CategoryDataDetails />
        </div>
      </div>
    </>
  );
};

export default CategoryDataDetailsPage;
