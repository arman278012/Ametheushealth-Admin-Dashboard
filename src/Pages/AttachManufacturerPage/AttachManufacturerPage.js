import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AttachManufacturer from "../../Components/AttachManufacturer/AttachManufacturer";

const AttachManufacturerPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <AttachManufacturer />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <AttachManufacturer />
        </div>
      </div>
    </>
  );
};

export default AttachManufacturerPage;
