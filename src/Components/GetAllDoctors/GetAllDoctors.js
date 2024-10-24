import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { FaUserDoctor } from "react-icons/fa6";

const GetAllDoctors = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterByGender, setFilterByGender] = useState("");
  const [filterByVisitingMode, setFilterByVisitingMode] = useState("");
  const [filterBySpeciality, setFilterBySpeciality] = useState("");
  const [specialtyData, setSpecialtyData] = useState([]); // State for specialties
  const [filterByLanguage, setFilterByLanguage] = useState("");

  const searchQuery = searchParams.get("search") || "";

  const navigate = useNavigate();

  const getDoctorsData = async () => {
    try {
      const params = {};
      // Add filters and pagination to the params object
      if (filterByGender) params.gender = filterByGender;
      if (filterByVisitingMode) params.visitingMode = filterByVisitingMode;
      if (filterByLanguage) params.language = filterByLanguage;
      if (filterBySpeciality) params.speciality = filterBySpeciality;
      if (searchQuery) params.name = searchQuery;

      // Pagination parameters
      params.page = currentPage; // current page
      params.limit = pageLimit || 10; // limit of results per page (default 10)

      const response = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/admin/getdoctors",
        {
          params, // Pass the dynamically built params object
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch specialties from API
  const getSpeciality = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/category`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setSpecialtyData(response.data); // Assuming response.data contains the specialties
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete doctor
  const deleteDoctor = async () => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors/${deleteId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    // Update the search query in the URL
    setSearchParams({ search: value });
  };

  useEffect(() => {
    getDoctorsData();
    getSpeciality();
  }, [
    filterByGender,
    filterByLanguage,
    filterBySpeciality,
    filterByVisitingMode,
    searchQuery,
    pageLimit,
    currentPage,
  ]);

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

  console.log(
    filterByGender,
    filterBySpeciality,
    filterByVisitingMode,
    filterByLanguage
  );

  return (
    <div className="flex flex-col p-5">
      <div>
        <p className="font-bold text-xl flex items-center mb-5">
          All Doctor Category
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
        </div>
      </div>

      <div className="bg-gray-200 sm:w-[100%] md:w-[100%] w-[100%]">
        <div className="flex justify-between mr-5">
          <div className="flex gap-3 p-5">
            <button
              onClick={() => navigate("/add-coupons")}
              className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Add Doctor
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
            value={filterByGender}
            onChange={(e) => setFilterByGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <select
            className="px-3 py-1 w-[150px] focus:outline-none rounded-md bg-white sm:block md:block hidden"
            value={filterByVisitingMode}
            onChange={(e) => setFilterByVisitingMode(e.target.value)}
          >
            <option value="">Visiting Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="both">Both</option>
          </select>

          <select
            className="px-3 py-1 sm:w-[170px] w-[230px] focus:outline-none rounded-md bg-white"
            value={filterByLanguage}
            onChange={(e) => setFilterByLanguage(e.target.value)}
          >
            <option value="">Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Arabic">Arabic</option>
            <option value="Chinese">Chinese</option>
            <option value="Russian">French</option>
            <option value="French">French</option>
          </select>

          <select
            className="px-3 py-1 w-[200px] focus:outline-none rounded-md bg-white sm:block md:block hidden"
            value={filterBySpeciality} // Bind selected value to state
            onChange={(e) => setFilterBySpeciality(e.target.value)} // Handle change
          >
            <option value="">Select Specialty</option>
            {specialtyData?.data?.map((specialty) => (
              <option key={specialty.id} value={specialty.name}>
                {specialty.specialtyName}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination section */}
        <div className="flex px-5 py-2 gap-3 justify-end">
          <div>
            <p>{categories?.totalCount || 0} results</p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => currentPage > 1 && setCurrentPage(1)}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>{currentPage}</p>
          </div>
          <div>
            <p>of {categories?.totalPages || 1}</p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === categories?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() => {
              if (currentPage < categories?.totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === categories?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() => setCurrentPage(categories?.totalPages)}
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
                <Th className="py-2 px-4 border-b  border-gray-300 text-left w-[15%]">
                  Avatar
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[25%]">
                  Name
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-center w-[10%]">
                  Gender
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-center w-[30%]">
                  Hospital Name
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[15%]">
                  Created At
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories?.data?.map((order, index) => (
                <Tr key={index}>
                  <Td className="py-2 px-4 border-b border-gray-300">
                    <input type="checkbox" className="form-checkbox" />
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 l">
                    {order.avatar ? (
                      <img
                        src={order.avatar}
                        className="h-[60px] w-[60px] rounded-full"
                      />
                    ) : (
                      <div className="">
                        <FaUserDoctor className="h-[50px] w-[50px] rounded-full" />
                      </div>
                    )}
                  </Td>
                  <Td className="py-2 px-4 border-b text-[14px] border-gray-300">
                    <p className="font-bold capitalize">{order.name}</p>
                    {order._id}
                    <div className="flex gap-2">
                      <button
                        className="text-[#2271b1]"
                        onClick={() => navigate(`${order._id}`)}
                      >
                        View
                      </button>
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        onClick={() => navigate(`edit/${order._id}`)}
                      >
                        Edit
                      </button>
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        onClick={() => {
                          setDeleteAlert(true);
                          setDeleteId(order._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order.gender}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px] text-center">
                    {order.hospitalName}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {convertToIST(order.createdAt)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
      {deleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg border-2 z-10">
            <p className="text-lg mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  deleteDoctor(deleteId);
                  setDeleteAlert(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteAlert(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllDoctors;
