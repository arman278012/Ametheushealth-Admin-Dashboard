import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import GetAllDoctors from "../../Components/GetAllDoctors/GetAllDoctors";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const GetAllDoctorsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <GetAllDoctors />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <GetAllDoctors />
        </div>
      </div>
    </>
  );
};

export default GetAllDoctorsPage;
