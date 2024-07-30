import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AttachGeneric from "../../Components/AttachGeneric/AttachGeneric";

const AttachGenericPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AttachGeneric />
        </div>
      </div>
    </>
  );
};

export default AttachGenericPage;
