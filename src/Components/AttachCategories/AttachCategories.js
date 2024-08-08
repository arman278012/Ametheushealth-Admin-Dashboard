import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import {
  fetchGetProductsData,
  setPage,
  setSearchQuery,
  setPageLimit,
} from "../../redux/slice/GetProductsSlice";
import {
  MdDeleteOutline,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AttachCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductIDs, setSelectedProductIDs] = useState([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState([]);
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  // const [pageLimit, setPageLimit] = useState("10");

  console.log(selectedProductDetails);

  const dispatch = useDispatch();
  const { allProductsData, currentPage, pageLimit, searchQuery } = useSelector(
    (state) => state.getproductsSlice
  );

  const navigate = useNavigate();

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  useEffect(() => {
    dispatch(
      fetchGetProductsData({ page: currentPage, pageLimit, searchQuery })
    );
  }, [dispatch, currentPage, pageLimit, searchQuery]);

  console.log(allProductsData);

  const filteredProducts = allProductsData?.data.filter((item) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const itemIdLower = item._id.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchQueryLower) ||
      itemIdLower.includes(searchQueryLower)
    );
  });

  console.log(filteredProducts);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const toggleOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const productCategoriesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.assetorix.com:4100/ah/api/v1/category/hierarchy-names",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setHierarchyData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productCategoriesData();
  }, []);

  const formik = useFormik({
    initialValues: {
      categoryID: [], // Initialize as an array
    },
    onSubmit: async (values) => {
      const data = {
        products: selectedProductIDs,
        categoryID: values.categoryID,
      };

      try {
        const response = await axios.post(
          "https://api.assetorix.com:4100/ah/api/v1/category/rmid",
          data,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );
        toast.success("Products attached to Categories...");
        console.log("API response:", response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    },
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const { categoryID } = formik.values;

    if (checked) {
      formik.setFieldValue("categoryID", [...categoryID, value]);
    } else {
      formik.setFieldValue(
        "categoryID",
        categoryID.filter((id) => id !== value)
      );
    }
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

  console.log(selectedProductDetails);

  return (
    <>
      <div className="overflow-x-auto p-5">
        <p className="font-bold text-xl mb-5">Attach Categories</p>
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
              className="p-3 border rounded-xl h-[45px] w-[300px]"
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
              <div className="product-categories border shadow-lg relative cursor-default">
                <div
                  onClick={toggleOpen}
                  className="flex gap-5 justify-center items-center mb-3 w-[300px]"
                >
                  <label className="font-bold text-lg text-gray-700 px-2 mt-2">
                    All Categories
                  </label>
                  <button
                    type="button"
                    className="focus:outline-none text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    {isOpen ? (
                      <FaChevronUp className="w-5 h-5 mt-[10px] mr-2" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 mt-[10px] mr-2" />
                    )}
                  </button>
                </div>
                <div
                  className={`absolute left-0 top-12 w-full bg-white rounded-lg shadow-lg transition-all duration-300 ${
                    isOpen
                      ? "max-h-[300px] overflow-y-auto"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  <div className="px-2 py-1 border-b last:border-0">
                    <input
                      type="checkbox"
                      name="categoryID"
                      value=""
                      className="mr-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      // checked={formik.values.categoryID === item._id}
                    />
                    <label className="font-semibold text-gray-600">None</label>
                  </div>

                  {hierarchyData?.map((item) => (
                    <div
                      className="px-2 py-1 border-b last:border-0"
                      key={item._id}
                    >
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={item._id}
                          name="categoryID"
                          value={item._id}
                          className="mr-2"
                          onChange={handleCheckboxChange}
                          checked={formik.values.categoryID.includes(item._id)}
                        />
                        <label
                          htmlFor={item._id}
                          className="font-semibold text-gray-600"
                        >
                          {item.name}
                        </label>
                      </div>
                      {item.children &&
                        item.children.map((child) => (
                          <div key={child._id} className="ml-4">
                            <div className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                id={child._id}
                                name="categoryID"
                                value={child._id}
                                className="mr-2"
                                onChange={handleCheckboxChange}
                                checked={formik.values.categoryID.includes(
                                  child._id
                                )}
                              />
                              <label
                                htmlFor={child._id}
                                className="font-medium text-gray-600"
                              >
                                {child.name}
                              </label>
                            </div>
                            {child.children &&
                              child.children.map((child2) => (
                                <div key={child2._id} className="ml-4">
                                  <div className="flex items-center mb-2">
                                    <input
                                      type="checkbox"
                                      id={child2._id}
                                      name="categoryID"
                                      value={child2._id}
                                      className="mr-2"
                                      onChange={handleCheckboxChange}
                                      checked={formik.values.categoryID.includes(
                                        child2._id
                                      )}
                                    />
                                    <label
                                      htmlFor={child2._id}
                                      className="font-medium text-gray-600"
                                    >
                                      {child2.name}
                                    </label>
                                  </div>
                                  {child2.children &&
                                    child2.children.map((child3) => (
                                      <div key={child3._id} className="ml-4">
                                        <div className="flex items-center mb-2">
                                          <input
                                            type="checkbox"
                                            id={child3._id}
                                            name="categoryID"
                                            value={child3._id}
                                            className="mr-2"
                                            onChange={handleCheckboxChange}
                                            checked={formik.values.categoryID.includes(
                                              child3._id
                                            )}
                                          />
                                          <label
                                            htmlFor={child3._id}
                                            className="font-medium text-gray-600"
                                          >
                                            {child3.name}
                                          </label>
                                        </div>
                                        {child3.children &&
                                          child3.children.map((child4) => (
                                            <div
                                              key={child4._id}
                                              className="ml-4"
                                            >
                                              <div className="flex items-center mb-2">
                                                <input
                                                  type="checkbox"
                                                  id={child4._id}
                                                  name="categoryID"
                                                  value={child4._id}
                                                  className="mr-2"
                                                  onChange={
                                                    handleCheckboxChange
                                                  }
                                                  checked={formik.values.categoryID.includes(
                                                    child4._id
                                                  )}
                                                />
                                                <label
                                                  htmlFor={child4._id}
                                                  className="font-medium text-gray-600"
                                                >
                                                  {child4.name}
                                                </label>
                                              </div>
                                            </div>
                                          ))}
                                      </div>
                                    ))}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))}
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
                    <input type="checkbox" />
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
                <Tbody>
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
              {selectedProductDetails.length > 0 ? (
                <button
                  onClick={formik.handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Attach Category
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttachCategories;
