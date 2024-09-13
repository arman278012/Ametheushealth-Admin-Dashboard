import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AddManufacturer from "../../Components/AddManufacturer/AddManufacturer";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AddManufacturerPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AddManufacturer />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AddManufacturer />
        </div>
      </div>
    </>
  );
};

export default AddManufacturerPage;
