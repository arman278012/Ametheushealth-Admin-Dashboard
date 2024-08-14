import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import Prescriptiondetails from "../../Components/PrecriptionDetails/Prescriptiondetails";

const PrescriptiondetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <Prescriptiondetails />
      </div>
    </div>
  );
};

export default PrescriptiondetailsPage;
