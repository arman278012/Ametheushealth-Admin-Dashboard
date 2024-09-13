import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AddCoupons from "../../Components/AddCoupons/AddCoupons";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AddCouponsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AddCoupons />
        </div>
      </div>
      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AddCoupons />
        </div>
      </div>
    </>
  );
};

export default AddCouponsPage;
