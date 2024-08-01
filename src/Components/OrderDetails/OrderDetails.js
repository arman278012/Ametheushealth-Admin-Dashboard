import React, { useState } from "react";

const OrderDetails = () => {
  const [pageLimit, setPageLimit] = useState(5);
  const [isTopBarOpen, setIsTopBarOpen] = useState(true);

  return (
    <div>
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center">Edit Orders</p>
        </div>
      </div>

      <div className="flex p-5 bg-gray-300 gap-5">
        <div className="w-[70%] border border-[gray] p-5 bg-white">
          <p className="border-[gray] text-xl">Order #19298 details</p>
          <p>
            Payment via Stripe - Credit card / debit card. Customer IP:
            185.172.53.66
          </p>
          <div>
            <div className="general mt-5">
              <div>
                <div>
                  {" "}
                  <p className="text-[18px] font-semibold">General</p>
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    type="date"
                    className="px-3 py-1 sm:w-[170px] w-[230px] focus:outline-none rounded-md bg-white border"
                  />
                  <select
                    id="fruits"
                    name="fruits"
                    className="px-3 py-1 sm:w-[170px] w-[230px] focus:outline-none rounded-md bg-white border"
                    // value={filter}
                    // onChange={handleFilterChange}
                  >
                    <option
                      value=""
                      disabled
                      hidden
                      className="placeholder opacity-50 foutline-none"
                    >
                      Filter by status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Processing Order">Processing Order</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="shipping"></div>
          </div>
        </div>

        <div className="w-[30%]">
          <p>Order Details here</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
