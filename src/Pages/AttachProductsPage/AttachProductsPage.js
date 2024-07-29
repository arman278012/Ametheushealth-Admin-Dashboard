import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AttachProducts from "../../Components/AttachProducts/AttachProducts";

const AttachProductsPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AttachProducts />
        </div>
      </div>
    </>
  );
};

export default AttachProductsPage;
