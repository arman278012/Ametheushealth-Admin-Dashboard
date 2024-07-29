import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AddCategory from "../../Components/AddCategory/AddCategory";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";
import LoginAlert from "../../Components/LoginAlert/LoginAlert";

const AddCategoryPage = () => {

  const authorization = localStorage.getItem("authorization");
  const id = localStorage.getItem("id");

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
          {authorization && id ? (
            <AddCategory className="w-[100%]" />
          ) : (
            <LoginAlert />
          )}
        </div>
      </div>
    </>
  );
};

export default AddCategoryPage;
