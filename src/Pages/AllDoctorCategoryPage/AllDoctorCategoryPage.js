import React from "react";
import AllDoctorCategory from "../../Components/AllDoctorCategory/AllDoctorCategory";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllDoctorCategoryPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AllDoctorCategory />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AllDoctorCategory />
        </div>
      </div>
    </>
  );
};

export default AllDoctorCategoryPage;
