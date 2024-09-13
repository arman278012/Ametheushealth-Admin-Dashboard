import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import CategorySubDetails from "../../Components/CategorySubDetails/CategorySubDetails";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const CategorySubDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <CategorySubDetails />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <CategorySubDetails />
        </div>
      </div>
    </>
  );
};

export default CategorySubDetailsPage;
