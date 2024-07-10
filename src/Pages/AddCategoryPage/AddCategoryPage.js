import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AddCategory from "../../Components/AddCategory/AddCategory";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AddCategoryPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar className="sm:block hidden" />
        </div>

        <div className="w-[100%] ">
          <AddCategory />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div>
          <AddCategory className="w-[100%]"/>
        </div>
      </div>
    </>
  );
};

export default AddCategoryPage;
