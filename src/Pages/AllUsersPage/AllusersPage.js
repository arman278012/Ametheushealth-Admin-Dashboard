import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import Allusers from "../../Components/Allusers/Allusers";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllusersPage = () => {
  return (
    <div>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <Allusers />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <Allusers />
        </div>
      </div>
    </div>
  );
};

export default AllusersPage;
