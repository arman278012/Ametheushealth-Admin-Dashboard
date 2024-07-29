import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import InstantManufacturer from "../../Components/InstantManufacturer/InstantManufacturer";

const InstantManufacturerPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <InstantManufacturer />
        </div>
      </div>
    </>
  );
};

export default InstantManufacturerPage;
