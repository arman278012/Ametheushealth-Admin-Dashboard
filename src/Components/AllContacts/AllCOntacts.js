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

const AllContacts = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allContactDetails, setAllContactDetails] = useState([]);

  const navigate = useNavigate();

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const getAllContacts = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/contact`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setAllContactDetails(response.data);
      console.log(response.data);
      console.log(allContactDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div>
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center">All Contacts</p>
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
      </div>

      <div className="bg-gray-200 sm:w-[100%] md:w-[100%] w-[100%]">
        <div className="flex justify-end mr-5">
          {/* <div className="flex gap-3 p-5">
            <p className="text-xl font-semibold">Orders</p>
            <button
              onClick={() => navigate("/add-order")}
              className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Add Order
            </button>
          </div> */}

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
                placeholder="search contacts..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
              />
            </div>
          </div>
        </div>
        <div className="flex px-5 py-2 gap-3 justify-end">
          <div>
            <p>{allContactDetails?.totalContacts || 0} results</p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            // onClick={() => currentPage > 1 && goToPage(1)}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            // onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
          >
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>{currentPage}</p>
          </div>
          <div>
            <p>of {allContactDetails?.totalPages || 1}</p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === allContactDetails?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            // onClick={() =>
            //   currentPage < allContactDetails?.totalPages &&
            //   goToPage(currentPage + 1)
            // }
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              currentPage === allContactDetails?.totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            // onClick={() =>
            //   currentPage < allContactDetails?.totalPages &&
            //   goToPage(allContactDetails?.totalPages)
            // }
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
                  Name
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Email
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Mobile
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Message
                </Th>
                {/* <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Status
                </Th> */}
              </Tr>
            </Thead>

            <Tbody>
              {allContactDetails?.data?.map((order) => (
                <Tr>
                  <Td className="py-2 px-4 border-b border-gray-300">
                    <input type="checkbox" className="form-checkbox" />
                  </Td>
                  <Td className="py-2 px-4 border-b  text-[14px] border-gray-300">
                    <div>
                      <p className="font-semibold text-[#2271b1] text-[12px]">
                        {order.name || ""}
                      </p>
                    </div>
                    <div className="flex flex-col flex-wrap gap-0">
                      <div>
                        <p className="font-normal text-[12px]">{order._id}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          // onClick={() =>
                          //   navigate(`/edit-products/${order._id}`)
                          // }
                        >
                          Edit
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          // onClick={() => {
                          //   navigate(`/product-details/${order._id}`);
                          // }}
                        >
                          View
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                            // onClick={() => {
                            //   setDeleteAlert(true);
                            //   setDeleteId(order._id);
                            // }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order.email}
                  </Td>
                  {/* <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {convertToIndianDate(order.createdAt)}
                  </Td> */}
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order.mobile}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {order.message}
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

export default AllContacts;
