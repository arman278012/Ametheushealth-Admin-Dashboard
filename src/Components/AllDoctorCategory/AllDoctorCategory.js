import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const AllDoctorCategory = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Getting the searchQuery from URL query params
  const searchQuery = searchParams.get("search") || "";

  // Get pagination and filter settings from URL if they exist
  useEffect(() => {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");

    if (page) setCurrentPage(Number(page));
    if (limit) setPageLimit(Number(limit));
    if (sortByParam) setSortBy(sortByParam);
    if (sortOrderParam) setSortOrder(sortOrderParam);
  }, [searchParams]);

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const deleteDoctorCategory = async () => {
    try {
      const response = await axios.delete(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/dc/admin/category/delete/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Deleted Successfully");
      allDoctorCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const allDoctorCategories = async () => {
    try {
      const response = await axios.get(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/dc/user/category`,
        {
          params: {
            specialtyName: searchQuery,
            sortBy,
            sortOrder,
            page: currentPage,
            limit: pageLimit, // Add the limit parameter for pagination
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setCategories(response.data);
      console.log("Doctor Categories", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    allDoctorCategories();
  }, [searchQuery, sortBy, sortOrder, currentPage, pageLimit]);

  useEffect(() => {
    setSearchParams({
      search: searchQuery,
      sortBy,
      sortOrder,
      page: currentPage,
      limit: pageLimit,
    });
  }, [searchQuery, sortBy, sortOrder, currentPage, pageLimit]);

  // Function to handle the search query
  const handleSearch = (e) => {
    const value = e.target.value;
    // Update the search query in the URL
    setSearchParams({ search: value });
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
    <div className="flex flex-col p-5">
      <div>
        <p className="font-bold text-xl flex items-center mb-5">
          All Doctor Category
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
          <div className="flex gap-3 p-5">
            <button
              onClick={() => navigate("/add-doctor-category")}
              className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Add Category
            </button>
          </div>

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
              placeholder="search categories"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
            />
          </div>
        </div>
        <div className="all-filters px-5 py-2 flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
          <select
            className="px-3 py-1 w-[150px] focus:outline-none rounded-md bg-white sm:block md:block hidden"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Sort by Date</option>
            <option value="specialtyName">Sort by Name</option>
          </select>

          <select
            className="px-3 py-1 sm:w-[170px] w-[230px] focus:outline-none rounded-md bg-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>

        <div className="flex px-5 py-2 gap-3 justify-end">
          <div>
            <p>{categories?.totalCount || 0} results</p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            onClick={() => currentPage > 1 && setCurrentPage(1)}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
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
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${currentPage === categories?.totalPages
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
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${currentPage === categories?.totalPages
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
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[2%]">
                  <input type="checkbox" className="form-checkbox" />
                </Th>
                <Th className="py-2 px-4 border-b  border-gray-300 text-left w-[10%]">
                  Id
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Specialty Name
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[20%]">
                  Sort Description
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
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
                  <Td className="py-2 px-4 border-b text-[14px] border-gray-300">
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
                    {order.specialtyName}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order.sortDescription}
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
                  deleteDoctorCategory(deleteId);
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

export default AllDoctorCategory;
