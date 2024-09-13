import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import CreateOrder from "../../Components/CreateOrder/CreateOrder";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const CreateOrderPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <CreateOrder />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <CreateOrder />
        </div>
      </div>
    </>
  );
};

export default CreateOrderPage;
