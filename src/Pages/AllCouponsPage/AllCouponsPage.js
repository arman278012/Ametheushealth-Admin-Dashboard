import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllCoupons from "../../Components/AllCoupaos/AllCoupons";

const AllCouponsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AllCoupons />
      </div>
    </div>
  );
};

export default AllCouponsPage;
