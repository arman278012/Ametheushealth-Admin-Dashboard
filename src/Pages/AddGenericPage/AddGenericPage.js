import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AddGeneric from "../../Components/AddGeneric/AddGeneric";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AddGenericPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AddGeneric />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AddGeneric />
        </div>
      </div>
    </>
  );
};

export default AddGenericPage;
