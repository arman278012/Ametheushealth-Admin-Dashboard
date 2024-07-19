import React, { useState } from "react";

const Addproduct = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    <p>Loading...</p>;
  } else {
    return (
      <>
        <div className="main-div-parent p-5 bg-[#f0f0f1]">
          <p className="text-[16px] font-bold">Add products</p>
          <div className="mt-5">
            <div className="left w-[70%] flex flex-col gap-3">
              <div className="add-products-name flex flex-col w-[100%]">
                <label className="font-semibold px-2 opacity-65">
                  Product name
                </label>
                <input
                  type="text"
                  placeholder="Product name"
                  className="h-[35px] border px-2"
                />
              </div>

              <div className="add-generic-name flex flex-col">
                <label className="font-semibold px-2 opacity-65">
                  Generic name
                </label>
                <input
                  type="text"
                  placeholder="Generic name"
                  className=" h-[35px] border px-2 w-[100%]"
                />
              </div>
              <div className="add-generic-name flex flex-col">
                <label className="font-semibold px-2 opacity-65">
                  Generic name
                </label>
                <input
                  type="text"
                  placeholder="Generic name"
                  className=" h-[35px] border px-2"
                />
              </div>
            </div>

            <div className="right w-[30%]"></div>
          </div>
        </div>
      </>
    );
  }
};

export default Addproduct;
