import React from "react";
import AllPerscription from "../../Components/AllPerscription/AllPerscription";
import MySideBar from "../../Components/MySideBar/MySideBar";

const AllPerscriptionPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AllPerscription />
      </div>
    </div>
  );
};

export default AllPerscriptionPage;
