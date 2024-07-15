import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AddGeneric from "../../Components/AddGeneric/AddGeneric";

const AddGenericPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AddGeneric />
      </div>
    </div>
  );
};

export default AddGenericPage;
