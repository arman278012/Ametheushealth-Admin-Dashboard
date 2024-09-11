import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AddCoupons from "../../Components/AddCoupons/AddCoupons";

const AddCouponsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AddCoupons />
      </div>
    </div>
  );
};

export default AddCouponsPage;
