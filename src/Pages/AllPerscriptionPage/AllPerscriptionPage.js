import React from "react";
import AllPerscription from "../../Components/AllPerscription/AllPerscription";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllPerscriptionPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AllPerscription />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AllPerscription />
        </div>
      </div>
    </>
  );
};

export default AllPerscriptionPage;
