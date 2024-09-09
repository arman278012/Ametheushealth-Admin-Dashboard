import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import Allusers from "../../Components/Allusers/Allusers";

const AllusersPage = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <Allusers />
        </div>
      </div>
    </div>
  );
};

export default AllusersPage;
