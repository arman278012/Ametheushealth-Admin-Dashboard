import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const OnboardingDoctors = () => {
  const [approveAlert, setApproveAlert] = useState(false);
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const searchQuery = searchParams.get("search") || "";
  const filterStatus = searchParams.get("status") || "";

  const fetchOnboardingDoctors = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/admin/doctor/processing`,
        {
          params: {
            search: searchQuery,
            page: currentPage,
            limit: pageLimit,
            status: filterStatus,
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setCategories(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams({ search: value, page: 1 });
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSearchParams({ status: value, page: 1 });
  };

  const handlePageChange = (page) => {
    setSearchParams({ page });
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchOnboardingDoctors();
  }, [searchParams, currentPage, pageLimit]);

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
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
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
  };

  return (

    <>
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center mb-5">
            All Onboarding Doctors
          </p>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${isTopBarOpen ? "max-h-screen" : "max-h-0"
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
            {/* <div className="flex gap-3 p-5">
            <button
              onClick={() => navigate("/add-coupons")}
              className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Add Doctor
            </button>
          </div> */}

            <div className="bg-white h-[30px] px-3 py-1">
              <p
                className={`cursor-pointer text-sm flex items-center`}
                onClick={toggleTopBar}
              >
                OPTIONS
                <span
                  className={`ml-1 transition-transform duration-300 ${isTopBarOpen ? "rotate-180" : "rotate-0"
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
                placeholder="search doctors"
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
              />
            </div>
          </div>

          {/* filterations */}
          <div className="all-filters px-5 py-2 flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
            <select
              className="px-3 py-1 w-[150px] focus:outline-none rounded-md bg-white sm:block md:block hidden"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="reject">Reject</option>
              <option value="accept">Accept</option>
              <div>
                <button>Change Status</button>
              </div>
            </select>
          </div>

          {/* Pagination section */}
          <div className="flex px-5 py-2 gap-3 justify-end">
            <div>{/* <p>{categories?.totalCount || 0} results</p> */}</div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              onClick={() => currentPage > 1 && handlePageChange(1)}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
              <p>{currentPage}</p>
            </div>
            <div>{/* <p>of {categories?.totalPages || 1}</p> */}</div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${currentPage === categories?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
                }`}
              onClick={() => {
                if (currentPage < categories?.totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
            >
              <MdKeyboardArrowRight />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${currentPage === categories?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
                }`}
              onClick={() => handlePageChange(categories?.totalPages)}
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>

          <div className="overflow-x-auto mt-5 border-2 p-5">
            <Table>
              <Thead>
                <Tr>
                  <Th className="py-2 px-4 border-b border-gray-300 text-left w-[5%]">
                    <input type="checkbox" className="form-checkbox" />
                  </Th>
                  {/* <Th className="py-2 px-4 border-b  border-gray-300 text-left w-[15%]">
                  Id
                </Th> */}
                  <Th className="py-2 px-4 border-b border-gray-300 text-left w-[20%]">
                    Name
                  </Th>
                  <Th className="py-2 px-4 border-b border-gray-300 text-center w-[15%]">
                    Gender
                  </Th>
                  <Th className="py-2 px-4 border-b border-gray-300 text-center w-[15%]">
                    Status
                  </Th>
                  {/* <Th className="py-2 px-4 border-b border-gray-300 text-center w-[10%]">
                  Approval
                </Th> */}
                  <Th className="py-2 px-4 border-b border-gray-300 text-center w-[15%]">
                    Doctor Type
                  </Th>
                  <Th className="py-2 px-4 border-b border-gray-300 text-left w-[20%]">
                    Created At
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories?.map((order, index) => (
                  <Tr key={index}>
                    <Td className="py-2 px-4 border-b border-gray-300">
                      <input type="checkbox" className="form-checkbox" />
                    </Td>
                    {/* <Td className="py-2 px-4 border-b border-gray-300">
                    {order._id}
                  </Td> */}
                    <Td className="py-2 px-4 border-b border-gray-300">
                      <span className="flex flex-col">
                        <span className="font-semibold">
                          {order.userDetails.name}
                        </span>
                        <span className="text-[13px]">{order._id}</span>
                      </span>
                      <div className="flex gap-2">

                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() => {
                            navigate(`/onboarding-doctors/${order._id}`);
                          }}
                        >
                          View and Edit
                        </button>{" "}
                      </div>
                    </Td>
                    <Td className="py-2 px-4 border-b border-gray-300 text-center">
                      {order?.userDetails?.gender}
                    </Td>
                    <Td className="py-2 px-4 border-b border-gray-300 text-center">
                      {order?.status}
                    </Td>
                    <Td className="py-2 px-4 border-b border-gray-300 text-center">
                      {order?.doctorType}
                    </Td>
                    <Td className="py-2 px-4 border-b border-gray-300">
                      {convertToIST(order.RequestcreatedAt)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
        {approveAlert && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
            <div className="absolute inset-0"></div>
            <div className="bg-white p-6 rounded-lg border-2 z-10">
              <p className="text-lg mb-4">Do you want to approve this docotor?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setApproveAlert(false);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => setApproveAlert(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OnboardingDoctors;