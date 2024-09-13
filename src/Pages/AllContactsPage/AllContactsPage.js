import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllOrders from "../../Components/AllContacts/AllCOntacts";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllContactsPage = () => {
  return (
    <div>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <AllOrders />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>
        <div className="w-[100%]">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default AllContactsPage;
