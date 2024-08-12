import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import SingleProductDetails from "../../Components/SingleProductDetails/SingleProductDetails";

const SingleProductDetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <SingleProductDetails />
      </div>
    </div>
  );
};

export default SingleProductDetailsPage;
