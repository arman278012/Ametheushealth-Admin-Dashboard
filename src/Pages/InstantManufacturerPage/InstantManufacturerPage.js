import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import InstantManufacturer from "../../Components/InstantManufacturer/InstantManufacturer";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const InstantManufacturerPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <InstantManufacturer />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <InstantManufacturer />
        </div>
      </div>
    </>
  );
};

export default InstantManufacturerPage;
