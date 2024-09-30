import React, { useEffect, useState } from "react";
import { selectGenericId } from "../../redux/slice/GetGenericIdSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import parse from "html-react-parser";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

const GenericDetails = () => {
  const genericId = useSelector(selectGenericId);
  console.log(genericId);

  const [genericData, setGenericData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [pageLimit, setPageLimit] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTopBaropen, setIsTopBarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBaropen);
  };

  const getGenericDetails = async (query = "", page = 1) => {
    setLoading(true);
    try {
      const response = await axios(
        `https://api.assetorix.com/ah/api/v1/generic/admin/${genericId}?page=${page}&limit=${pageLimit}&search=${query}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      const data = response.data;
      setGenericData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (genericId) {
      getGenericDetails("", currentPage);
    }
  }, [genericId, currentPage, pageLimit]);

  const goToPage = (page) => {
    if (page > 0 && page <= genericData.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-5">
        <div>
          <p className="font-bold uppercase">{genericData?.data?.name}</p>
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
        {/* tables for generics where i will show all the generic data */}
        <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
          <div>
            <p className="font-bold">
              {loading ? (
                <Skeleton width={50} />
              ) : (
                (genericData?.totalProducts || 0) + " Total items"
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
            onClick={() => goToPage(currentPage - 1)}
          >
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>{loading ? <Skeleton width={20} /> : currentPage}</p>
          </div>
          <div>
            <p>
              of{" "}
              {loading ? <Skeleton width={20} /> : genericData?.totalPages || 0}
            </p>
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            onClick={() => goToPage(currentPage + 1)}
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
        <Table className="mt-5">
          <Thead>
            <Tr className=" bg-gray-200 w-[100%]">
              <Th className="py-2 px-4 border-b w-[10%]">
                <input type="checkbox" />
              </Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">Name</Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">Id</Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">
                Treatment
              </Th>
              <Th className="py-2 px-4 border-b w-[30%] text-start">Generic</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading
              ? Array.from({
                  length: genericData?.data ? genericData?.data.length : 5,
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
              : genericData?.data?.products?.map((product) => (
                  <Tr key={product._id}>
                    <Td className="py-2 px-4 border-b text-center">
                      <input type="checkbox" />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      {product.title}
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          onClick={() =>
                            navigate(`/edit-products/${product._id}`)
                          }
                        >
                          Edit
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() =>
                            navigate(`/product-details/${product._id}`)
                          }
                        >
                          View
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() => {
                            setDeleteId(product._id);
                            setDeleteAlert(true);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product._id}
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product.treatment}
                    </Td>

                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product?.generic
                        ? product?.generic
                        : "No Generic Available"}
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
        <div className="parent flex flex-col gap-10 py-5 bg-white">
          <div className="main-content w-[100%] flex flex-col gap-10">
            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="  uppercase">
                Uses of{" "}
                <span className="text-red-500 font-semibold">
                  {genericData?.data?.name}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-[170px] mt-1"></div>

              <div className="text-justify">
                {parse(`<p>${genericData?.data?.uses}</p>`)}
              </div>
            </div>

            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="uppercase">
                Side Effects of{" "}
                <span className="text-red-500 font-semibold">
                  {genericData?.data?.name}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-[200px] mt-1"></div>
              <div className="text-justify">
                {parse(`<p>${genericData?.data?.sideEffects}</p>`)}
              </div>
            </div>

            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="uppercase">
                FAQs about{" "}
                <span className="text-red-500 font-semibold">
                  {genericData?.data?.name}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-[150px] mt-1"></div>
              <div className="text-justify">
                {parse(`<p>${genericData?.data?.faq}</p>`)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenericDetails;
