import React from "react";
import Orders from "../../Components/Orders/Orders";
import MySideBar from "../../Components/MySideBar/MySideBar";

const OrdersPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <MySideBar />
        </div>
        <div className="w-[100%]">
          <Orders />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
