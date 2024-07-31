import React from "react";
import Orders from "../../Components/Orders/Orders";

const OrdersPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <MySideBar />
        </div>
        <div>
          <Orders />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
