import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetProductsData,
  setPage,
  setPageLimit,
  setSearchQuery,
} from "../../redux/slice/GetProductsSlice";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  MdDeleteOutline,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import toast from "react-hot-toast";

const AttachGeneric = () => {
  const [selectedProductIDs, setSelectedProductIDs] = useState([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [genericsopen, setGenericsOpen] = useState(false);
  const [genericsMap, setGenericMap] = useState([]);
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [searchGeneric, setSearchGeneric] = useState("");

  const handleSearchGeneric = (e) => {
    setSearchGeneric(e.target.value);
  };

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const handleSelectAllChange = () => {
    if (isSelectAllChecked) {
      setSelectedProductIDs([]);
    } else {
      const allProductIDs =
        allProductsData?.data?.map((product) => product._id) || [];
      setSelectedProductIDs(allProductIDs);
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };

  const dispatch = useDispatch();

  const { allProductsData, currentPage, pageLimit, searchQuery } = useSelector(
    (state) => state.getproductsSlice
  );

  useEffect(() => {
    dispatch(
      fetchGetProductsData({ page: currentPage, pageLimit, searchQuery })
    );
  }, [dispatch, currentPage, pageLimit, searchQuery]);

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const toggleOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const toggleGenericsOpen = (e) => {
    e.preventDefault();
    setGenericsOpen(!genericsopen);
  };

  const formik = useFormik({
    initialValues: {
      genericID: "",
    },
    onSubmit: async (values) => {
      const data = {
        products: selectedProductIDs,
        genericID: values.genericID,
      };

      try {
        const response = await axios.post(
          "https://ah-backend-djja.onrender.com/generic/rmid",
          data,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );
        if (response.status == 200) {
          toast.success("Generic Attached");
          window.location.reload();
        }

        console.log("API response:", response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    },
  });

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleProductCheckboxChange = (product) => {
    const updatedProductIDs = selectedProductIDs.includes(product._id)
      ? selectedProductIDs.filter((id) => id !== product._id)
      : [...selectedProductIDs, product._id];

    setSelectedProductIDs(updatedProductIDs);

    const updatedProductDetails = updatedProductIDs.map((id) =>
      allProductsData.data.find((product) => product._id === id)
    );

    setSelectedProductDetails(updatedProductDetails);
  };

  const handleDeleteProduct = (productID) => {
    const updatedProductIDs = selectedProductIDs.filter(
      (id) => id !== productID
    );
    setSelectedProductIDs(updatedProductIDs);
    const updatedProductDetails = updatedProductIDs.map((id) =>
      allProductsData.data.find((product) => product._id === id)
    );
    setSelectedProductDetails(updatedProductDetails);
  };

  const genericsData = async (searchGeneric) => {
    try {
      const response = await axios.get(
        ` https://ah-backend-djja.onrender.com/generic/names?search=${searchGeneric}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericMap(response.data);
      console.log("generic data", genericsMap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      genericsData(searchGeneric);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchGeneric]);

  const handleGenericsChange = (setFieldValue, e) => {
    setFieldValue("genericID", e.target.value);
  };

  console.log("genericsMap", genericsMap);

  return (
    <>
      <div className="overflow-x-auto p-5">
        <p className="font-bold text-xl mb-5">Attach Generic</p>
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
                onClick={() =>
                  dispatch(
                    fetchGetProductsData({
                      pageLimit,
                    })
                  )
                }
                onChange={(e) => dispatch(setPageLimit(Number(e.target.value)))}
                value={pageLimit}
                className="border-2 rounded-md w-[50px] h-[30px] px-3 text-sm py-2"
              />
            </div>

            {/* <div className="flex justify-center items-center">
              <button
                onClick={() =>
                  dispatch(
                    fetchGetProductsData({
                      page: currentPage,
                      pageLimit,
                      searchQuery,
                    })
                  )
                }
                className="bg-[#13a3bc] hover:bg-[#13b6d5] w-[50px] h-[30px] text-white rounded-md text-[13px]"
              >
                Apply
              </button>
            </div> */}
          </div>
        </div>
        <div className="flex justify-end mr-5">
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
        <div className="main-content-div bg-gray-300 p-5 w-full flex justify-between">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products here..."
              className="p-3 border rounded-xl h-[45px] w-[300px] focus:outline-none"
            />
            {/* <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 flex justify-center items-center p-3 border rounded-xl h-[45px] text-white font-bold"
            >
              Search
            </button> */}
          </div>

          <div className="flex gap-4">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full max-w-lg mx-auto"
            >
              <div className="product-categories border shadow-lg relative cursor-default w-[250px] h-[45px]">
                <div className="flex justify-between items-center px-3">
                  <label className="font-bold text-lg text-gray-700 px-2 mt-2">
                    All Generics
                  </label>
                  <button
                    onClick={toggleGenericsOpen}
                    className="focus:outline-none text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    {genericsopen ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>
                </div>

                <div
                  className={`absolute left-0 top-12 w-full bg-white rounded-lg shadow-lg transition-all duration-300 ${
                    genericsopen
                      ? "h-[250px] overflow-y-auto"
                      : "h-0 overflow-hidden"
                  } transition-all duration-300`}
                >
                  <div>
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={searchGeneric}
                        onChange={handleSearchGeneric}
                        placeholder="Search products here..."
                        className="p-3 border rounded-xl h-[45px] w-[250px]"
                      />
                    </div>
                    <div className="px-2 py-1 border-b last:border-0">
                      <input
                        type="radio"
                        name="genericID"
                        value=""
                        className="mr-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // checked={formik.values.categoryID === item._id}
                      />
                      <label className="font-semibold text-gray-600">
                        None
                      </label>
                    </div>
                    {genericsMap?.map((generic) => (
                      <div
                        key={generic?.id}
                        className="px-2 py-1 border-b last:border-0 flex"
                      >
                        <input
                          id={generic._id}
                          type="radio"
                          name="genericID"
                          className="mr-2"
                          value={generic?._id}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.genericID === generic._id}
                        />
                        <p>{generic?.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex px-5 py-2 gap-3 ">
          <div>
            <p>{allProductsData?.totalProducts || 0} results</p>
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            onClick={() => handlePageChange(1)}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          >
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>{currentPage}</p>
          </div>
          <div>
            <p>of {allProductsData?.totalPages}</p>
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            onClick={() =>
              handlePageChange(
                Math.min(currentPage + 1, allProductsData?.totalPages || 1)
              )
            }
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            onClick={() => handlePageChange(allProductsData?.totalPages || 1)}
          >
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>

        <div className="flex gap-10 p-5">
          <div className="w-[50%]">
            <Table className="min-w-full bg-white border border-gray-300]">
              <Thead>
                <Tr className=" bg-gray-200 w-[100%]">
                  <Th className="py-2 px-4 border-b w-[10%] border-r">
                    <input
                      type="checkbox"
                      checked={isSelectAllChecked}
                      onChange={handleSelectAllChange}
                    />
                  </Th>
                  <Th className="py-2 px-4 border-b w-[40%] text-start border-r">
                    Name
                  </Th>
                  {/* <Th className="py-2 px-4 border-b text-start">Id</Th> */}
                  <Th className="py-2 px-4 border-b w-[50%] text-start border-r">
                    Generic
                  </Th>
                </Tr>
              </Thead>
              {allProductsData?.data?.map((product) => (
                <Tbody key={product._id}>
                  <Tr>
                    <Td className="p-3 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedProductIDs.includes(product._id)}
                        onChange={() => handleProductCheckboxChange(product)}
                      />
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product.title}
                    </Td>
                    {/* <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product._id}
                    </Td> */}
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product._id}
                    </Td>
                  </Tr>
                </Tbody>
              ))}
            </Table>
            <div className="flex px-5 py-2 gap-3 ">
              <div>
                <p>{allProductsData?.totalProducts || 0} results</p>
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() => handlePageChange(1)}
              >
                <MdOutlineKeyboardDoubleArrowLeft />
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              >
                <MdOutlineKeyboardArrowLeft />
              </div>
              <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
                <p>{currentPage}</p>
              </div>
              <div>
                <p>of {allProductsData?.totalPages}</p>
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() =>
                  handlePageChange(
                    Math.min(currentPage + 1, allProductsData?.totalPages || 1)
                  )
                }
              >
                <MdKeyboardArrowRight />
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() =>
                  handlePageChange(allProductsData?.totalPages || 1)
                }
              >
                <MdKeyboardDoubleArrowRight />
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <Table className="min-w-full bg-white border border-gray-300]">
              <Thead>
                <Tr className=" bg-gray-200 w-[100%]">
                  <Th className="py-2 px-4 border-r text-start w-[45%]">Id</Th>
                  <Th className="py-2 px-4 border-r text-start w-[45%]">
                    Name
                  </Th>
                  <Th className="py-2 px-4 border-r text-start w-[10%]">
                    Delete
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {selectedProductDetails.map((item) => (
                  <Tr key={item._id}>
                    <Td className="p-3 border text-start text-[14px]">
                      {item._id}
                    </Td>
                    <Td className="p-3 border text-start text-[14px]">
                      {item.title}
                    </Td>
                    <Td className="p-3 border text-center text-red-700 text-xl text-[14px]">
                      <MdDeleteOutline
                        className="cursor-pointer"
                        onClick={() => handleDeleteProduct(item._id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <div className="flex justify-center mt-10">
              <button
                onClick={formik.handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Attach Generic
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttachGeneric;
