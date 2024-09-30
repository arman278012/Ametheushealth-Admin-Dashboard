import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [isTopBaropen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState("10");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const showAllBlogs = async (query = "", page = 1, pageLimit = 10) => {
    query = encodeURIComponent(query);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/blog/admin?search=${query}&page=${page}&limit=${pageLimit}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );

      console.log("allBlogs", allBlogs);
      setAllBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      showAllBlogs(searchQuery, currentPage); // Call the API with the current page
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage]); // Include currentPage as a dependency

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBaropen);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // debouncedSearch(query);
  };

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com/ah/api/v1/blog/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Deleted Succesfully...");
    } catch (err) {
      console.log(err);
    } finally {
      showAllBlogs();
    }
  };

  const goToPage = (page) => {
    if (page > 0 && page <= allBlogs.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto p-5">
      <p className="font-bold text-xl">All Blogs</p>
      <div className="mb-2">
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isTopBaropen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="flex gap-3">
            {/* <p>Pagination</p> */}

            <div className="flex gap-2">
              <p>Number of items per page:</p>
              <input
                type="text"
                className="border-2 rounded-md w-[50px] h-[30px] px-3 text-sm py-2"
                onChange={(e) => setPageLimit(e.target.value)}
                value={pageLimit}
              />
            </div>

            {/* <div className="flex justify-center items-center">
              <button
                onClick={(e) => setPageLimit(e.target.value)}
                className="bg-[#13a3bc] hover:bg-[#13b6d5] w-[50px] h-[30px] text-white rounded-md text-[13px]"
              >
                Apply
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="main-content-div bg-gray-300 p-5">
        <div className="flex justify-end relative -top-5">
          <div className="bg-white h-[30px] px-3 py-1 flex justify-end">
            <p
              className={`cursor-pointer text-sm flex items-center`}
              onClick={toggleTopBar}
            >
              OPTIONS
              <span
                className={`ml-1 transition-transform duration-300 ${
                  isTopBaropen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </p>
          </div>
        </div>
        <div className="mb-5 flex gap-2 justify-end">
          <input
            type="text"
            className="py-2 rounded-xl px-3 w-[250px]"
            placeholder="Search Blogs..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-between mb-5">
          <div className="flex gap-5">
            <button
              onClick={() => navigate("/add-blogs")}
              className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl"
            >
              Add Blogs
            </button>
          </div>

          <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
            <div>
              <p className="font-bold">
                {allBlogs?.totalCount || 0} Total items
              </p>
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => currentPage > 1 && goToPage(1)}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                currentPage > 1 && goToPage(Math.max(currentPage - 1, 1))
              }
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
              <p>{allBlogs?.currentPage || 0}</p>
            </div>
            <div>
              <p>of {allBlogs?.totalPages || 0}</p>
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === allBlogs?.totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                currentPage < (allBlogs?.totalPages || 1) &&
                goToPage(Math.min(currentPage + 1, allBlogs?.totalPages || 1))
              }
            >
              <MdKeyboardArrowRight />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === allBlogs?.totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                currentPage < (allBlogs?.totalPages || 1) &&
                goToPage(allBlogs?.totalPages || 1)
              }
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
        </div>
        <Table className="min-w-full bg-white border border-gray-300">
          <Thead>
            <Tr className=" bg-gray-200 w-[100%]">
              <Th className="py-2 px-4 border-b w-[5%]">
                <input type="checkbox" />
              </Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[20%]">
                Image
              </Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[30%]">
                Title
              </Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[15%]">
                Visibility
              </Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[15%]">
                Views
              </Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[15%]">Date</Th>
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
              : allBlogs?.data?.map((item, index) => (
                  <Tr
                    key={index}
                    className="border-t"
                    // onClick={() => dispatch(storeMyId(item._id))}
                  >
                    <Td className="py-2 px-4 border-b text-center">
                      <input type="checkbox" />
                    </Td>
                    <Td className="py-2 px-4 border-b text-center">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <p className="text-[#2271b1]">{item?.title}</p>
                      <div className="text-[12px]">{item?._id}</div>
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          onClick={() => navigate(`/edit-blogs/${item?._id}`)}
                        >
                          Edit
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          // onClick={() =>
                          //   navigate(`/all-categories/${item?._id}`)
                          // }
                        >
                          View
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() => {
                            setDeleteAlert(true);
                            setSelectedId(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      {item?.published == true ? "Published" : "Draft"}
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <span className="text-green-600 font-semibold">
                        {item?.views}
                      </span>
                    </Td>

                    <Td className="py-2 px-0 border-b text-[13px]">
                      <div className="flex flex-col">
                        <p className="font-bold">
                          Created:{" "}
                          <span className="font-normal">
                            {" "}
                            {item?.createdAt?.split("T")[0]}
                          </span>
                        </p>

                        <p className="font-bold">
                          Updated:{" "}
                          <span className="font-normal">
                            {" "}
                            {item?.updatedAt?.split("T")[0]}
                          </span>
                        </p>
                      </div>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </div>
      {deleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg border-2 z-10">
            <p className="text-lg mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  deleteBlog(selectedId);
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

export default AllBlogs;
