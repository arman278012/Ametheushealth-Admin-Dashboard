import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const Allusers = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState("10");
  const [allUser, setAllUser] = useState([]);
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const getAllUser = async (
    searchUserQuery = "",
    page = 1,
    pageLimit = "10"
  ) => {
    searchUserQuery = encodeURIComponent(searchUserQuery);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/user/admin/all-user?search=${searchUserQuery}&page=${page}&limit=${pageLimit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setAllUser(response.data);
      console.log("All User Data", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Optionally handle the error with a user-friendly message
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchUserQuery) {
        getAllUser(searchUserQuery, 1, pageLimit); // Pass pageLimit here
      } else {
        getAllUser("", 1, pageLimit); // Pass pageLimit here
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchUserQuery, pageLimit]); // Add pageLimit to dependency array

  const goToPage = (page) => {
    if (page > 0 && page <= allUser.totalPages) {
      setCurrentUserPage(page);
    }
  };

  useEffect(() => {
    getAllUser(searchUserQuery, currentUserPage, pageLimit);
  }, [currentUserPage, pageLimit]);

  return (
    <div>
      <div className="flex flex-col p-5">
        <div className="p-5">
          <p className="font-bold text-xl flex items-center">All Users</p>
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
              <p className="text-xl font-semibold">Users</p>
              <button
                onClick={() => navigate("#")}
                className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out"
              >
                Add User
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

          <div className="mb-5 flex mr-3 justify-end">
            <input
              type="text"
              className="py-2 rounded-xl px-3 w-[250px] focus:outline-none"
              placeholder="Search Users..."
              value={searchUserQuery}
              onChange={(e) => setSearchUserQuery(e.target.value)}
            />
          </div>
          <div className="flex sm:flex-row flex-col justify-end mb-5">
            <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
              <div>
                <p className="font-bold">
                  {allUser?.totalCount || 0} Total items
                </p>
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() => goToPage(1)}
              >
                <MdOutlineKeyboardDoubleArrowLeft />
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() => goToPage(Math.max(currentUserPage - 1, 1))}
              >
                <MdOutlineKeyboardArrowLeft />
              </div>
              <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
                <p>{currentUserPage || 0}</p>
              </div>
              <div>
                <p>of {allUser?.totalPages || 0}</p>
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() =>
                  goToPage(
                    Math.min(currentUserPage + 1, allUser?.totalPages || 1)
                  )
                }
              >
                <MdKeyboardArrowRight />
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() => goToPage(allUser?.totalPages || 1)}
              >
                <MdKeyboardDoubleArrowRight />
              </div>
            </div>
          </div>
          <Table className="min-w-full bg-white border">
            <Thead>
              <Tr className=" bg-gray-200 w-[100%]">
                <Th className="py-2 px-4 border-b text-start sm:w-[10%]">
                  Image
                </Th>
                <Th className="py-2 px-4 border-b text-start sm:w-[25%]">
                  Name
                </Th>
                <Th className="py-2 px-4 border-b text-start sm:w-[25%]">
                  Email
                </Th>
                <Th className="py-2 px-4 border-b text-start sm:w-[15%]">
                  Role
                </Th>
                <Th className="py-2 px-4 border-b text-start sm:w-[15%]">
                  Mobile
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading
                ? Array.from({ length: 10 })?.map((_, index) => (
                    <Tr key={index} className="border-t">
                      <Td className="py-2 px-4 border-b text-center">
                        <Skeleton circle={true} height={12} width={12} />
                      </Td>
                      <Td className="py-2 px-4 border-b text-center">
                        <Skeleton circle={true} height={48} width={48} />
                      </Td>
                      <Td className="py-2 px-4 border-b text-[14px]">
                        <Skeleton width={`80%`} />
                      </Td>
                      <Td className="py-2 px-4 border-b text-[14px]">
                        <Skeleton width={`80%`} count={2} />
                      </Td>
                      <Td className="py-2 px-4 border-b text-[14px]">
                        <Skeleton width={`50%`} />
                      </Td>
                      <Td className="py-2 px-4 border-b text-[14px]">
                        <Skeleton width={`50%`} />
                      </Td>
                      <Td className="py-2 px-4 border-b text-[13px]">
                        <Skeleton width={`50%`} />
                      </Td>
                    </Tr>
                  ))
                : allUser?.data?.map((item) => (
                    <Tr key={item._id} className="border-t">
                      <Td className="py-2 px-4 border-b text-[14px]">
                        <img
                          src={
                            item?.avatar || "https://via.placeholder.com/150"
                          }
                          alt="User"
                          className="w-12 h-12 object-cover"
                        />
                      </Td>
                      <Td className="py-2 px-4 border-b text-[14px]">
                        <p className="text-[#2271b1]">{item?.name}</p>
                        <div className="flex flex-col">
                          <div className="text-[12px]">{item?._id}</div>
                          <div className="flex gap-2">
                            <button
                              className="text-[#2271b1]"
                              // onClick={() =>
                              //   navigate(`/edit-products/${singleItem._id}`, {
                              //     state: { search: searchParams.toString() },
                              //   })
                              // }
                            >
                              Edit
                            </button>{" "}
                            <span className="text-[#2271b1]">|</span>
                            <button
                              className="text-[#2271b1]"
                              onClick={() => {
                                navigate(`/all-users/${item._id}`);
                              }}
                            >
                              View
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
                        </div>
                      </Td>
                      <Td className="py-2 px-4 border-b text-[14px]">
                        {item?.email}
                      </Td>
                      <Td className="py-2 px-4 border-b text-[14px]">
                        {item?.role}
                      </Td>
                      <Td className="py-2 px-4 border-b text-[14px]">
                        <span className="text-green-600 font-semibold">
                          {item?.mobile}
                        </span>
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

export default Allusers;
