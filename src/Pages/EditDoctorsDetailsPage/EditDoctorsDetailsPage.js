import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";
import EditDoctorsDetails from "../../Components/EditDoctorsDetails/EditDoctorsDetails";

const EditDoctorsDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <EditDoctorsDetails />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <EditDoctorsDetails />
        </div>
      </div>
    </>
  );
};

export default EditDoctorsDetailsPage;
