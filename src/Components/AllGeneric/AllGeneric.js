import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/ContextProvider";
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { storeGenericId } from "../../redux/slice/GetGenericIdSlice";

const AllGeneric = () => {
  const [genericData, setGenericData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTopBaropen, setIsTopBarOpen] = useState(true);
  const [pageLimit, setPageLimit] = useState("5");

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBaropen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setEditGenericForm } = useContext(AppContext);

  //get all data
  const allGenericData = async (query, page) => {
    setLoading(true);
    console.log("page", pageLimit);
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/generic/?page=${page}&limit=${pageLimit}&search=${query}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericData(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        allGenericData(searchQuery, currentPage);
      } else {
        allGenericData("", currentPage);
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage, pageLimit]);

  //delete generic data
  const deleteGenericData = async (id) => {
    try {
      await axios.delete(
        `https://api.assetorix.com:4100/ah/api/v1/generic/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Deleted Successfully...");
      setDeleteAlert(false);
      allGenericData(searchQuery, currentPage); // Reload current page data after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex flex-col gap-3 px-5 py-2">
        <div>
          <p className="font-bold text-xl flex items-center cursor-pointer">
            Generics
          </p>
        </div>

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
        {/* <div className="sm:w-[100%] w-[320px] h-[1px] bg-gray-400"></div> */}
      </div>
      <div className="overflow-x-auto p-5 bg-gray-300">
        <div>
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
              placeholder="Search generics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-between mb-5">
          <div className="flex gap-5">
            <button className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl">
              Bulk Delete
            </button>
            <button
              onClick={() => navigate("/add-generic")}
              className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl"
            >
              Add Generic
            </button>
          </div>

          <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
            <div>
              <p className="font-bold">
                {loading ? (
                  <Skeleton width={50} />
                ) : (
                  (genericData?.totalCount || 0) + " Total items"
                )}
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
              onClick={() => goToPage(genericData?.page - 1)}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
              <p>
                {loading ? <Skeleton width={20} /> : genericData?.page || 0}
              </p>
            </div>
            <div>
              <p>
                of{" "}
                {loading ? (
                  <Skeleton width={20} />
                ) : (
                  genericData?.totalPages || 0
                )}
              </p>
            </div>
            <div
              className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
              onClick={() => goToPage(genericData?.page + 1)}
            >
              <MdKeyboardArrowRight />
            </div>
            <div
              className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
              onClick={() => goToPage(genericData?.totalPages)}
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
        </div>

        <Table className="min-w-full bg-white border border-gray-300">
          <Thead>
            <Tr className=" bg-gray-200 w-[100%]">
              <Th className="py-2 px-4 border-b w-[10%]">
                <input type="checkbox" />
              </Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">Name</Th>
              <Th className="py-2 px-4 border-b w-[10%] text-start">Slug</Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">Id</Th>
              <Th className="py-2 px-4 border-b w-[40%] text-start">Uses</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading
              ? Array.from({
                  length: genericData.data ? genericData.data.length : 5,
                }).map((_, index) => (
                  <Tr key={index}>
                    <Td className="py-2 px-4 border-b text-center">
                      <Skeleton circle width={20} height={20} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <Skeleton width={100} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      <Skeleton width={100} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      <Skeleton width={200} />
                    </Td>
                  </Tr>
                ))
              : genericData.data?.map((item) => (
                  <Tr
                    key={item._id}
                    onClick={() => dispatch(storeGenericId(item._id))}
                  >
                    <Td className="py-2 px-4 border-b text-center">
                      <input type="checkbox" />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      {item?.name}
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          onClick={() => setEditGenericForm(true)}
                        >
                          Edit
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() => navigate(`/generic-details`)}
                        >
                          View
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() => {
                            setDeleteAlert(true);
                            setDeleteId(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </Td>

                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {item?.slug}
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {item?._id}
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {item?.uses ? (
                        expanded[item._id] ? (
                          <>{parse(`<p>${item?.uses}</p>`)}</>
                        ) : (
                          <>{parse(`<p>${item.uses.slice(0, 50)}...</p>`)}</>
                        )
                      ) : (
                        <>No uses available</>
                      )}
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>

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
                    deleteGenericData(deleteId);
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
    </>
  );
};

export default AllGeneric;
