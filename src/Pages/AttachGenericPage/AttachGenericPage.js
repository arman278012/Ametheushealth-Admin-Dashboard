import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AttachGeneric from "../../Components/AttachGeneric/AttachGeneric";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AttachGenericPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AttachGeneric />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AttachGeneric />
        </div>
      </div>
    </>
  );
};

export default AttachGenericPage;
