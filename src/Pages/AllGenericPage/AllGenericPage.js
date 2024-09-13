import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllGeneric from "../../Components/AllGeneric/AllGeneric";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllGenericPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AllGeneric />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AllGeneric />
        </div>
      </div>
    </>
  );
};

export default AllGenericPage;
