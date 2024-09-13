import React from "react";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const OrderDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <OrderDetails />
        </div>
      </div>
      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <OrderDetails />
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
