import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AttachManufacturer from "../../Components/AttachManufacturer/AttachManufacturer";

const AttachManufacturerPage = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <AttachManufacturer />
        </div>
      </div>
    </div>
  );
};

export default AttachManufacturerPage;
