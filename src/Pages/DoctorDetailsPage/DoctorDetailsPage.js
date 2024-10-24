import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import DoctorDetails from "../../Components/DoctorDetails/DoctorDetails";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const DoctorDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <DoctorDetails />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <DoctorDetails />
        </div>
      </div>
    </>
  );
};

export default DoctorDetailsPage;
