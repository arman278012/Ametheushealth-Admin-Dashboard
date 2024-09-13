import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import GenericDetails from "../../Components/GenericDetails/GenericDetails";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const GenericDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <GenericDetails />
        </div>
      </div>
      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <GenericDetails />
        </div>
      </div>
    </>
  );
};

export default GenericDetailsPage;
