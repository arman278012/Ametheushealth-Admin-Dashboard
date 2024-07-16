import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import GenericDetails from "../../Components/GenericDetails/GenericDetails";

const GenericDetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <GenericDetails />
      </div>
    </div>
  );
};

export default GenericDetailsPage;
