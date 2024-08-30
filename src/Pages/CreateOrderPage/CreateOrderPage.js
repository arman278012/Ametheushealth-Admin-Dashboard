import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import CreateOrder from "../../Components/CreateOrder/CreateOrder";

const CreateOrderPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <CreateOrder />
      </div>
    </div>
  );
};

export default CreateOrderPage;