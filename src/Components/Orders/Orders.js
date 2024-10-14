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
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
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
  const [filter, setFilter] = useState("");

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

  const allOrders = async (page, pageLimit, query, filter) => {
    query = encodeURIComponent(query); // Sanitize query string
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/order/admin/orders?page=${page}&limit=${pageLimit}&search=${query}&status=${filter}`,
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

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    // Call the allOrders function with the new filter
    allOrders(currentPage, pageLimit, searchQuery, selectedFilter);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    const page = parseInt(params.get("page")) || 1;
    const pagelimit = parseInt(params.get("pagelimit")) || "";

    setSearchQuery(query);
    setCurrentPage(page);
    setPageLimit(pageLimit);
    allOrders(page, pageLimit, query, filter, pagelimit); // Fetch orders with initial values
  }, [location.search, pageLimit, filter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newParams = new URLSearchParams();
      newParams.set("search", searchQuery);
      newParams.set("page", currentPage);
      newParams.set("pagelimit", pageLimit);
      navigate({ search: newParams.toString() }); // Update the URL
      allOrders(currentPage, pageLimit, searchQuery, filter); // Fetch orders when values change
    }, 300); // Debounce for smooth search experience

    return () => clearTimeout(delayDebounceFn); // Clear timeout on unmount or change
  }, [searchQuery, currentPage, pageLimit, filter, navigate]);

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

  //for checked

  const [checkedItems, setCheckedItems] = useState({});

  // Function to toggle all checkboxes
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    const newCheckedItems = {};

    allOrdersDetails.orders.forEach((order) => {
      newCheckedItems[order._id] = checked; // Set each order's checkbox state
    });

    setCheckedItems(newCheckedItems);
  };

  // Function to handle individual checkbox change
  const handleCheckboxChange = (orderId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [orderId]: !prevCheckedItems[orderId], // Toggle the specific checkbox
    }));
  };

  return (
    <div>
      {/* top section is here */}
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center">Orders</p>
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
              <p className="text-xl font-semibold">Orders</p>
              <button
                onClick={() => navigate("/create-order")}
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
          <div className="flex sm:flex-row flex-col justify-end px-5 py-2">
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
            </div>
          </div>
          <div className="all-filters px-5 py-2 flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
            <select
              id="fruits"
              name="fruits"
              className="px-3 py-1 w-[150px] textArea rounded-md bg-white sm:block md:block hidden border"
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

            <select
              id="fruits"
              name="fruits"
              className="px-3 py-1 sm:w-[170px] w-[230px] textArea rounded-md bg-white"
              value={filter}
              onChange={handleFilterChange}
            >
              <option
                value=""
                disabled
                hidden
                className="placeholder opacity-50 foutline-none"
              >
                Filter by status
              </option>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Processing Order">Processing Order</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
              <option value="Delivered">Delivered</option>
              <option value="Refunded">Refunded</option>
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
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={
                        Object.keys(checkedItems).length > 0 &&
                        Object.values(checkedItems).every(Boolean)
                      }
                      onChange={handleSelectAll}
                    />
                  </Th>
                  <Th className="py-2 px-4 border-b  border-gray-300 text-left w-[10%]">
                    Name
                  </Th>
                  <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                    Order Id
                  </Th>
                  <Th className="py-2 px-4 border-b border-gray-300 text-left w-[15%]">
                    Date
                  </Th>
                  <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                    Price
                  </Th>
                  <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                    Status
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {allOrdersDetails?.orders?.map((order) => (
                  <Tr key={order._id}>
                    <Td className="py-2 px-4 border-b border-gray-300">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={checkedItems[order._id] || false}
                        onChange={() => handleCheckboxChange(order._id)}
                      />
                    </Td>
                    <Td className="py-2 px-4 border-b  text-[14px] border-gray-300">
                      {order.name}
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          onClick={() =>
                            navigate(`/orders-details/${order._id}`)
                          }
                        >
                          Edit
                        </button>{" "}
                        {/* <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        // onClick={() => {
                        //   setDeleteAlert(true);
                        //   setDeleteId(singleItem._id);
                        // }}
                      >
                        Delete
                      </button> */}
                      </div>
                    </Td>
                    <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                      {order._id}
                    </Td>
                    <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                      {convertToIST(order.createdAt)}
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
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
