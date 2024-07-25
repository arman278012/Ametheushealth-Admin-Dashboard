import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AddManufacturer from "../../Components/AddManufacturer/AddManufacturer";

const AddManufacturerPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AddManufacturer />
      </div>
    </div>
  );
};

export default AddManufacturerPage;
