import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllGeneric from "../../Components/AllGeneric/AllGeneric";

const AllGenericPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AllGeneric />
      </div>
    </div>
  );
};

export default AllGenericPage;
