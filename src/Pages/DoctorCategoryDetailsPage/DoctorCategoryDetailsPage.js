import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";
import DoctorCategoryDetails from "../../Components/DoctorCategoryDetails/DoctorCategoryDetails";

const DoctorCategoryDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <DoctorCategoryDetails />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <DoctorCategoryDetails />
        </div>
      </div>
    </>
  );
};

export default DoctorCategoryDetailsPage;
