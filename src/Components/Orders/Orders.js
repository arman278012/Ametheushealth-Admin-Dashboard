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

const Orders = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(true);
  const [pageLimit, setPageLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchOptionQuery, setSearchOptionQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [storeOptionId, setStoreOptionId] = useState(null);
  const [allOrdersDetails, setAllOrdersDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const toggleDropdown = () => {
    setIsDropOpen(!isDropOpen);
  };

  const handleSelectOption = (option) => {
    setStoreOptionId(option._id);
    setSelectedOption(option);
    setSearchQuery(option._id); // Set the search query to the selected option ID
    setIsDropOpen(false); // Close the dropdown
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const allOrders = async (page, pageLimit, query) => {
    try {
      const response = await axios.get(
        ` https://api.assetorix.com:4100/ah/api/v1/order/admin/orders?page=${page}&limit=${pageLimit}&search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setAllOrdersDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      allOrders(currentPage, pageLimit, searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage, pageLimit]);

  const convertToIndianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div>
      {/* top section is here */}
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center cursor-pointer">
            Orders
          </p>
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

            {/* <div className="flex justify-center items-center">
              <button
                onClick={() =>
                  dispatch(
                    fetchGetProductsData({
                      page: currentPage,
                      pageLimit,
                      searchQuery,
                    })
                  )
                }
                className="bg-[#13a3bc] hover:bg-[#13b6d5] w-[50px] h-[30px] text-white rounded-md text-[13px]"
              >
                Apply
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="bg-gray-200 sm:w-[100%] md:w-[100%] w-[100%]">
        <div className="flex justify-between mr-5">
          <div className="flex gap-3 p-5">
            <p className="text-xl font-semibold">Orders</p>
            <button
              onClick={() => navigate("/add-product")}
              className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Add Order
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
        <div className="flex sm:flex-row flex-col justify-between px-5 py-2">
          <div className="left flex gap-3 justify-center items-center sm:justify-normal">
            <div className="all text-sm">All</div>{" "}
            <span className="text-sm">|</span>
            <div className="published text-blue-500 text-sm">
              Published
            </div>{" "}
            <span className="text-sm">|</span>
            <div className="Draft text-blue-500 text-sm">Drafts</div>{" "}
            <span className="text-sm">|</span>
            <div className="Sorting text-blue-500 text-sm">Sorting</div>
          </div>

          <div className="right flex gap-2 sm:mt-0 mt-5">
            <div>
              <input
                placeholder="search orders..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
              />
            </div>

            <div>
              {/* <button
                onClick={() =>
                  dispatch(
                    fetchGetProductsData({
                      page: currentPage,
                      pageLimit,
                      searchQuery,
                    })
                  )
                }
                className="bg-[#13a3bc] hover:bg-[#13b6d5] outline-none px-2 rounded-md text-white p-[5px]"
              >
                Search Products
              </button> */}
            </div>
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
              selected
              disabled
              hidden
              className="placeholder opacity-50"
            >
              Bulk Actions
            </option>
            <option value="apple">Edit</option>
            <option value="banana">Move to Trash</option>
          </select>
          <div className="sm:flex md:flex hidden justify-center items-center">
            <button className="bg-[#13a3bc] hover:bg-[#13b6d5] w-[70px] h-[30px] text-white rounded-md">
              Apply
            </button>
          </div>

          {/* for mobile section */}
          <div className="sm:hidden md:hidden flex gap-3">
            <select
              id="fruits"
              name="fruits"
              className="px-3 py-1 w-[150px] focus:outline-none rounded-md bg-white"
            >
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="cherry">Cherry</option>
              <option value="date">Date</option>
              <option value="elderberry">Elderberry</option>
            </select>
            <div className="flex justify-center items-center">
              <button className="bg-[#13a3bc] w-[70px] h-[30px] text-white rounded-md">
                Apply
              </button>
            </div>
          </div>

          <div className="relative inline-block text-left">
            <button
              type="button"
              className="w-[250px] px-3 py-1 h-[33px] inline-flex justify-center rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={toggleDropdown}
            >
              {selectedOption
                ? selectedOption.name
                : "Filter by registered mobile"}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropOpen && (
              <div className="absolute right-0 z-10 mt-2 w-[250px] bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-1">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchOptionQuery}
                    onChange={(e) => setSearchOptionQuery(e.target.value)}
                    className="w-full px-3 py-1 border rounded-md border-gray-300"
                  />
                </div>
                <div className="py-1">
                  {searchLoading ? ( // Show loading indicator
                    <p className="text-center py-2">Loading...</p>
                  ) : filteredData.length === 0 ? (
                    <p className="text-center py-2">No options found</p>
                  ) : (
                    filteredData.map((option) => (
                      <div
                        key={option._id}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleSelectOption(option)}
                      >
                        {option.name}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <select
            id="fruits"
            name="fruits"
            className="px-3 py-1 sm:w-[200px] w-[230px] focus:outline-none rounded-md bg-white"
          >
            <option
              value=""
              selected
              disabled
              hidden
              className="placeholder opacity-50 foutline-none"
            >
              Filter by stock status
            </option>
            <option value="apple">In stock</option>
            <option value="banana">Out of stock</option>
          </select>

          <div className="flex justify-center items-center">
            <button className="bg-[#13a3bc] hover:bg-[#13b6d5] sm:w-[70px] w-[230px] h-[30px] text-white rounded-md">
              Filter
            </button>
          </div>
        </div>
        <div className="flex px-5 py-2 gap-3 justify-end">
          <div>
            <p>{allOrdersDetails?.totalOrders || 0} results</p>
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
            <p>of {allOrdersDetails?.totalPages || 1}</p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === allOrdersDetails?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() =>
              currentPage < allOrdersDetails?.totalPages &&
              goToPage(currentPage + 1)
            }
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === allOrdersDetails?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() =>
              currentPage < allOrdersDetails?.totalPages &&
              goToPage(allOrdersDetails?.totalPages)
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
                  Order
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Order Id
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Date
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Price
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[8%]">
                  Status
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {allOrdersDetails?.orders?.map((order) => (
                <Tr>
                  <Td className="py-2 px-4 border-b border-gray-300">
                    <input type="checkbox" className="form-checkbox" />
                  </Td>
                  <Td className="py-2 px-4 border-b  text-[14px] border-gray-300">
                    {order.name}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order._id}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {convertToIndianDate(order.createdAt)}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order.currency} {order.totalCartPrice}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
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
                        <p className="uppercase">Processing Order</p>
                      </div>
                    ) : order.status === "Shipped" ? (
                      <div className="bg-green-300 px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Shipped</p>
                      </div>
                    ) : order.status === "Delivered" ? (
                      <div className="bg-green-600 px-2 py-1 font-semibold flex justify-center items-center">
                        <p className="uppercase">Delivered</p>
                      </div>
                    ) : (
                      <div>
                        <p>No Status Found</p>
                      </div>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
