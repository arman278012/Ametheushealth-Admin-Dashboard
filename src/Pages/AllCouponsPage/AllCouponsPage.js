import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllCoupons from "../../Components/AllCoupaos/AllCoupons";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllCouponsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AllCoupons />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AllCoupons />
        </div>
      </div>
    </>
  );
};

export default AllCouponsPage;
