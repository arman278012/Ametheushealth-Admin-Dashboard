import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllOrders from "../../Components/AllContacts/AllCOntacts";

const AllContactsPage = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default AllContactsPage;
