import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import InstantGeneric from "../../Components/InstantGeneric/InstantGeneric";

const InstantGenericPage = () => {
  return (
    <div className="flex gap-8">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <InstantGeneric />
      </div>
    </div>
  );
};

export default InstantGenericPage;
