import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import InstantGeneric from "../../Components/InstantGeneric/InstantGeneric";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const InstantGenericPage = () => {
  return (
    <>
      <div className="sm:flex hidden gap-8">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <InstantGeneric />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <InstantGeneric />
        </div>
      </div>
    </>
  );
};

export default InstantGenericPage;
