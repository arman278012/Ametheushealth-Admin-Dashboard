import React from "react";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import MySideBar from "../../Components/MySideBar/MySideBar";

const OrderDetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <OrderDetails />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
