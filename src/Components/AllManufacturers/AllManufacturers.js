import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const AllManufacturers = () => {
  const [isTopBaropen, setIsTopBarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [manufacturersData, setManufacturersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBaropen);
  };

  const getManufacturersData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/manufacturer`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setManufacturersData(response.data);
      console.log("manufacturersData", manufacturersData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getManufacturersData();
  }, []);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  //delete manufacturer
  const deleteManufacturer = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com:4100/ah/api/v1/manufacturer/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      getManufacturersData();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 px-5 py-2">
        <div>
          <p className="font-bold text-xl flex items-center cursor-pointer">
            All Manufacturers
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
                // onChange={(e) => setPageLimit(e.target.value)}
                // value={pageLimit}
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
                placeholder="Search manufacturers..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-between mb-5">
          <div className="flex gap-5">
            <button className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl">
              Bulk Delete
            </button>
            <button
              onClick={() => navigate("/add-manufacturer")}
              className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl"
            >
              Add Manufacturer
            </button>
          </div>

          <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
            <div>
              <p className="font-bold">
                {loading ? (
                  <Skeleton width={50} />
                ) : (
                  (manufacturersData?.totalCount || 50) + " Total items"
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
              onClick={() => goToPage(manufacturersData?.page - 1)}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
              <p>
                {loading ? (
                  <Skeleton width={20} />
                ) : (
                  manufacturersData?.page || 1
                )}
              </p>
            </div>
            <div>
              <p>
                of{" "}
                {loading ? (
                  <Skeleton width={20} />
                ) : (
                  manufacturersData?.totalPages || 5
                )}
              </p>
            </div>
            <div
              className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
              onClick={() => goToPage(manufacturersData?.page + 1)}
            >
              <MdKeyboardArrowRight />
            </div>
            <div
              className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
              onClick={() => goToPage(manufacturersData?.totalPages)}
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
              <Th className="py-2 px-4 border-b w-[40%] text-start">Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading
              ? Array.from({
                  length: manufacturersData.data
                    ? manufacturersData.data.length
                    : 5,
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
              : manufacturersData.data?.map((item) => (
                  <Tr
                    key={item._id}
                    //   onClick={() => dispatch(storeGenericId(item._id))}
                  >
                    <Td className="py-2 px-4 border-b text-center">
                      <input type="checkbox" />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      {item?.name}
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          //   onClick={() => deleteManufacturer(item._id)}
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
                          onClick={() => deleteManufacturer(item._id)}
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
                      {item?.address ? item?.address : "No Address Available"}
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </div>
    </>
  );
};

export default AllManufacturers;
