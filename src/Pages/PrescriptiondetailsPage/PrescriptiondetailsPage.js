import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import Prescriptiondetails from "../../Components/PrecriptionDetails/Prescriptiondetails";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const PrescriptiondetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <Prescriptiondetails />
        </div>
      </div>
      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <Prescriptiondetails />
        </div>
      </div>
    </>
  );
};

export default PrescriptiondetailsPage;
