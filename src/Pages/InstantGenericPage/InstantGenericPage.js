import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import InstantGeneric from "../../Components/InstantGeneric/InstantGeneric";

const InstantGenericPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div>
        <InstantGeneric />
      </div>
    </div>
  );
};

export default InstantGenericPage;
