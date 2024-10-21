import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";
import AddDoctorCategory from "../../Components/AddDoctorCategory/AddDoctorCategory";

const AddDoctorCategoryPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AddDoctorCategory />
        </div>
      </div>
      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AddDoctorCategory />
        </div>
      </div>
    </>
  );
};

export default AddDoctorCategoryPage;
