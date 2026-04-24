import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectManufacturerId } from "../../redux/slice/ManufacturerIdSlice";
import axios from "axios";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

const ManufacturerProducts = () => {
  const [manufacturersProducts, setManufacturersProducts] = useState([]);
  const [loading, setLoadng] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageLimit, setPageLimit] = useState("10");
  const [isTopBaropen, setIsTopBarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const manufacturerId = useSelector(selectManufacturerId);

  const navigate = useNavigate();

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBaropen);
  };

  const getManufacturersProducts = async (page = currentPage, search = "") => {
    try {
      const response = await axios.get(
        `https://ah-backend-djja.onrender.com/manufacturer/admin/${manufacturerId}?page=${page}&limit=${pageLimit}&search=${search}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setManufacturersProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getManufacturersProducts(currentPage);
  }, [currentPage]);

  const deleteManufacturerProducts = async (id) => {
    try {
      const response = await axios.patch(
        `https://ah-backend-djja.onrender.com/manufacturer/rmid/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Deleted Successfully...");
      getManufacturersProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const goToPage = (page) => {
    if (page > 0 && page <= manufacturersProducts.totalPages) {
      setCurrentPage(page);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === manufacturersProducts.totalPages;

  return (
    <div className="flex flex-col gap-3 px-5 py-2 ">
      <div className="overflow-x-auto p-5 bg-gray-300">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl flex items-center">
            {manufacturersProducts?.data?.name}
          </p>
          <p className="font-bold text-sm flex items-center">
            {manufacturersProducts?.data?.address
              ? manufacturersProducts?.data?.address
              : "No Address Available"}
          </p>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isTopBaropen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="flex gap-3">
            <div className="flex gap-2">
              <p>Number of items per page:</p>
              <input
                type="text"
                className="border-2 rounded-md w-[50px] h-[30px] px-3 text-sm py-2"
                onChange={(e) => setPageLimit(e.target.value)}
                value={pageLimit}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end relative -top-5"></div>
        <div className=" h-[30px] px-3 py-1 flex justify-end">
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
        <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
          <div>
            <p className="font-bold">
              {loading ? (
                <Skeleton width={50} />
              ) : (
                (manufacturersProducts?.totalProducts || 50) + " Total items"
              )}
            </p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              isFirstPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => !isFirstPage && goToPage(1)}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              isFirstPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => !isFirstPage && goToPage(currentPage - 1)}
          >
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>{loading ? <Skeleton width={20} /> : currentPage}</p>
          </div>
          <div>
            <p>
              of{" "}
              {loading ? (
                <Skeleton width={20} />
              ) : (
                manufacturersProducts?.totalPages || 5
              )}
            </p>
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              isLastPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => !isLastPage && goToPage(currentPage + 1)}
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
              isLastPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              !isLastPage && goToPage(manufacturersProducts.totalPages)
            }
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
            <Th className="py-2 px-4 border-b w-[20%] text-start">Id</Th>
            <Th className="py-2 px-4 border-b w-[20%] text-start">Treatment</Th>
            <Th className="py-2 px-4 border-b w-[30%] text-start">Generic</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading
            ? Array.from({
                length: manufacturersProducts.data
                  ? manufacturersProducts.data.length
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
            : manufacturersProducts?.data?.products?.map((product) => (
                <Tr
                  key={product._id}
                  //   onClick={() => dispatch(storeManufacturerId(item._id))}
                >
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
                  deleteManufacturerProducts(deleteId);
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

export default ManufacturerProducts;
