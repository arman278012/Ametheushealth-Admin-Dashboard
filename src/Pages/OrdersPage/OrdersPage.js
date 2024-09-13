import React from "react";
import Orders from "../../Components/Orders/Orders";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const OrdersPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <Orders />
        </div>
      </div>
      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>
        <div className="w-[100%]">
          <Orders />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
