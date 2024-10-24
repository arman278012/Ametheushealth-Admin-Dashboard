import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import EditDoctorCategory from "../../Components/EditDoctorCategory/EditDoctorCategory";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const EditDoctorCategoryPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <EditDoctorCategory />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <EditDoctorCategory />
        </div>
      </div>
    </>
  );
};

export default EditDoctorCategoryPage;
