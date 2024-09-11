import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const AllCoupons = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [getAllCoupons, setGetAllCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [discountFilter, setDiscountFilter] = useState("");

  const navigate = useNavigate();

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const getCoupons = async (searchQuery, filter) => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/coupon?search=${searchQuery}&discountType=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGetAllCoupons(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getCoupons(searchQuery, discountFilter);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, discountFilter]);

  const handleDiscountFilterChange = (e) => {
    const filter = e.target.value;
    setDiscountFilter(filter);
    getCoupons(filter, searchQuery);
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const convertToIST = (utcDate) => {
    const date = new Date(utcDate);
    // Convert to IST
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
  };

  return (
    <div className="flex flex-col p-5">
      <div>
        <p className="font-bold text-xl flex items-center mb-5">All Coupons</p>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isTopBarOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex gap-3">
          <div className="flex gap-2">
            <p>Number of items per page:</p>
            <input
              type="text"
              onChange={(e) => setPageLimit(e.target.value)}
              value={pageLimit}
              className="border-2 rounded-md w-[50px] h-[30px] px-3 text-sm py-2"
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-200 sm:w-[100%] md:w-[100%] w-[100%]">
        <div className="flex justify-between mr-5">
          <div className="flex gap-3 p-5">
            <button
              onClick={() => navigate("/add-coupons")}
              className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Add Coupons
            </button>
          </div>

          <div className="bg-white h-[30px] px-3 py-1">
            <p
              className={`cursor-pointer text-sm flex items-center`}
              onClick={toggleTopBar}
            >
              OPTIONS
              <span
                className={`ml-1 transition-transform duration-300 ${
                  isTopBarOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </p>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col justify-end px-5 py-2">
          <div className="right flex gap-2 sm:mt-0 mt-5">
            <input
              placeholder="search coupons..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
            />
          </div>
        </div>
        <div className="all-filters px-5 py-2 flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
          <select
            id="fruits"
            name="fruits"
            className="px-3 py-1 w-[150px] focus:outline-none rounded-md bg-white sm:block md:block hidden"
          >
            <option
              value=""
              disabled
              selected
              hidden
              className="placeholder opacity-50"
            >
              Is Active?
            </option>
            <option value="apple">Yes</option>
            <option value="banana">No</option>
          </select>

          <select
            id="fruits"
            name="fruits"
            className="px-3 py-1 sm:w-[170px] w-[230px] focus:outline-none rounded-md bg-white"
            value={discountFilter}
            onChange={handleDiscountFilterChange}
          >
            <option
              value=""
              disabled
              hidden
              className="placeholder opacity-50 outline-none"
            >
              Filter by Discount Type
            </option>
            <option value="">All</option>
            <option value="flat">Flat Discount</option>
            <option value="free_delivery">Free Delivery</option>
            <option value="percentage">Percentage Discount</option>
          </select>
        </div>
        <div className="flex px-5 py-2 gap-3 justify-end">
          <div>
            <p>{getAllCoupons?.totalCount || 0} results</p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => currentPage > 1 && goToPage(1)}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
          >
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>{currentPage}</p>
          </div>
          <div>
            <p>of {getAllCoupons?.totalPages || 1}</p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === getAllCoupons?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() =>
              currentPage < getAllCoupons?.totalPages &&
              goToPage(currentPage + 1)
            }
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === getAllCoupons?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() =>
              currentPage < getAllCoupons?.totalPages &&
              goToPage(getAllCoupons?.totalPages)
            }
          >
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>
        <div className="overflow-x-auto mt-5 border-2 p-5">
          <Table>
            <Thead>
              <Tr>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[2%]">
                  <input type="checkbox" className="form-checkbox" />
                </Th>
                <Th className="py-2 px-4 border-b  border-gray-300 text-left w-[10%]">
                  Code
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Discount Type
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[15%]">
                  Created Date
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[15%]">
                  Expiry Date
                </Th>
                {/* <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Status
                </Th> */}
              </Tr>
            </Thead>

            <Tbody>
              {getAllCoupons?.data?.map((order) => (
                <Tr key={order._id}>
                  <Td className="py-2 px-4 border-b border-gray-300">
                    <input type="checkbox" className="form-checkbox" />
                  </Td>
                  <Td className="py-2 px-4 border-b  text-[14px] border-gray-300">
                    {order.code}
                    <div className="flex gap-2">
                      <button
                        className="text-[#2271b1]"
                        // onClick={() => {
                        //   setDeleteAlert(true);
                        //   setDeleteId(singleItem._id);
                        // }}
                      >
                        View
                      </button>
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        onClick={() => navigate(`/orders-details/${order._id}`)}
                      >
                        Edit
                      </button>{" "}
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        // onClick={() => {
                        //   setDeleteAlert(true);
                        //   setDeleteId(singleItem._id);
                        // }}
                      >
                        Delete
                      </button>
                    </div>
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order.discountType}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {convertToIST(order.createdAt)}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {convertToIST(order.expiryDate)}
                  </Td>
                  {/* <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order.status === "Pending" ? (
                      <div className="bg-yellow-200 px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Pending</p>
                      </div>
                    ) : order.status === "Accepted" ? (
                      <div className="bg-green-400 px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Accepted</p>
                      </div>
                    ) : order.status === "Rejected" ? (
                      <div className="bg-red-500 px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Rejected</p>
                      </div>
                    ) : order.status === "Processing Order" ? (
                      <div className="bg-gray-400 px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Order Processing</p>
                      </div>
                    ) : order.status === "Shipped" ? (
                      <div className="bg-green-300 px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Shipped</p>
                      </div>
                    ) : order.status === "Delivered" ? (
                      <div className="bg-green-600 px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Delivered</p>
                      </div>
                    ) : order.status === "Refunded" ? (
                      <div className="bg-[#000000] text-white px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Refunded</p>
                      </div>
                    ) : (
                      <div>
                        <p>No Status Found</p>
                      </div>
                    )}
                  </Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllCoupons;
