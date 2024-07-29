import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  fetchGetProductsData,
  setPage,
  setPageLimit,
  setSearchQuery,
} from "../../redux/slice/GetProductsSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("");
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchOptionQuery, setSearchOptionQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false); // New loading state
  const [storeOptionId, setStoreOptionId] = useState(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const categories = ["Date", "Fig", "Grape", "Honeydew"];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const [isTopBarOpen, setIsTopBarOpen] = useState(true);
  const dispatch = useDispatch();
  const {
    allProductsData,
    isLoading,
    isError,
    error,
    currentPage,
    pageLimit,
    searchQuery,
  } = useSelector((state) => state.getproductsSlice);

  useEffect(() => {
    dispatch(
      fetchGetProductsData({ page: currentPage, pageLimit, searchQuery })
    );
  }, [dispatch, currentPage, pageLimit, searchQuery]);

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handlePageLimitChange = (event) => {
    dispatch(setPageLimit(event.target.value));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(""));
  };

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const filteredProducts = allProductsData?.data.filter((item) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const itemIdLower = item._id.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchQueryLower) ||
      itemIdLower.includes(searchQueryLower)
    );
  });

  const toggleDropdown = () => {
    setIsDropOpen(!isDropOpen);
  };

  // Filter API
  const filterOptions = async (query) => {
    if (!query) {
      setFilteredData([]); // Clear data if query is empty
      return;
    }
    try {
      setSearchLoading(true); // Start loading
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/category/view/?search=${query}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false); // End loading
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterOptions(searchOptionQuery);
    }, 300); // Increased debounce delay for better UX

    return () => clearTimeout(delayDebounceFn);
  }, [searchOptionQuery]);

  useEffect(() => {
    filterOptions();
  }, []);

  const handleSelectOption = (option) => {
    setStoreOptionId(option._id);
    setSelectedOption(option);
    dispatch(setSearchQuery(option._id)); // Set the search query to the selected option ID
    setIsDropOpen(false); // Close the dropdown
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com:4100/ah/api/v1/product/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {/* top section is here */}
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center cursor-pointer">
            Products
          </p>
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
                value={pageLimit}
                onChange={handlePageLimitChange}
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
        {/* <div className="sm:w-[100%] w-[320px] h-[1px] bg-gray-400"></div> */}
      </div>

      {/* bottom section is here */}
      <div className="bg-gray-200 sm:w-[100%] md:w-[100%] w-[100%]">
        <div className="flex justify-between mr-5">
          <div className="flex gap-3 p-5">
            <p className="text-xl font-semibold">Products</p>
            <button
              onClick={() => navigate("/add-product")}
              className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Add New
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

        <div className="flex sm:flex-row flex-col justify-between px-5 py-2">
          <div className="left flex gap-3 justify-center items-center sm:justify-normal">
            <div className="all text-sm">All</div>{" "}
            <span className="text-sm">|</span>
            <div className="published text-blue-500 text-sm">
              Published
            </div>{" "}
            <span className="text-sm">|</span>
            <div className="Draft text-blue-500 text-sm">Drafts</div>{" "}
            <span className="text-sm">|</span>
            <div className="Sorting text-blue-500 text-sm">Sorting</div>
          </div>

          <div className="right flex gap-2 sm:mt-0 mt-5">
            <div>
              <input
                placeholder="search products..."
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
              />
            </div>

            <div>
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
                className="bg-[#13a3bc] hover:bg-[#13b6d5] outline-none px-2 rounded-md text-white p-[5px]"
              >
                Search Products
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="all-filters px-5 py-2 flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
            <select
              id="fruits"
              name="fruits"
              className="px-3 py-1 w-[150px] focus:outline-none rounded-md bg-white sm:block md:block hidden"
            >
              <option
                value=""
                selected
                disabled
                hidden
                className="placeholder opacity-50"
              >
                Bulk Actions
              </option>
              <option value="apple">Edit</option>
              <option value="banana">Move to Trash</option>
            </select>
            <div className="sm:flex md:flex hidden justify-center items-center">
              <button className="bg-[#13a3bc] hover:bg-[#13b6d5] w-[70px] h-[30px] text-white rounded-md">
                Apply
              </button>
            </div>

            {/* for mobile section */}
            <div className="sm:hidden md:hidden flex gap-3">
              <select
                id="fruits"
                name="fruits"
                className="px-3 py-1 w-[150px] focus:outline-none rounded-md bg-white"
              >
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="cherry">Cherry</option>
                <option value="date">Date</option>
                <option value="elderberry">Elderberry</option>
              </select>
              <div className="flex justify-center items-center">
                <button className="bg-[#13a3bc] w-[70px] h-[30px] text-white rounded-md">
                  Apply
                </button>
              </div>
            </div>

            <div className="relative inline-block text-left">
              <button
                type="button"
                className="w-[200px] px-3 py-1 h-[33px] inline-flex justify-center rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={toggleDropdown}
              >
                {selectedOption ? selectedOption.name : "Filter by category"}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropOpen && (
                <div className="absolute right-0 z-10 mt-2 w-[200px] bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-1">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchOptionQuery}
                      onChange={(e) => setSearchOptionQuery(e.target.value)}
                      className="w-full px-3 py-1 border rounded-md border-gray-300"
                    />
                  </div>
                  <div className="py-1">
                    {searchLoading ? ( // Show loading indicator
                      <p className="text-center py-2">Loading...</p>
                    ) : filteredData.length === 0 ? (
                      <p className="text-center py-2">No options found</p>
                    ) : (
                      filteredData.map((option) => (
                        <div
                          key={option._id}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSelectOption(option)}
                        >
                          {option.name}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <select
              id="fruits"
              name="fruits"
              className="px-3 py-1 sm:w-[200px] w-[230px] focus:outline-none rounded-md bg-white"
            >
              <option
                value=""
                selected
                disabled
                hidden
                className="placeholder opacity-50 foutline-none"
              >
                Filter by stock status
              </option>
              <option value="apple">In stock</option>
              <option value="banana">Out of stock</option>
            </select>

            <div className="flex justify-center items-center">
              <button className="bg-[#13a3bc] hover:bg-[#13b6d5] sm:w-[70px] w-[230px] h-[30px] text-white rounded-md">
                Filter
              </button>
            </div>
          </div>
          <div className="flex px-5 py-2 gap-3 justify-end">
            <div>
              <p>{filteredProducts?.length || 0} results</p>
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

          <div className="overflow-x-auto mt-5 border-2 p-5">
            <Table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[2%]">
                    <input type="checkbox" className="form-checkbox" />
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[10%]">
                    Image
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[18%]">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[10%]">
                    SKU
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[15%]">
                    Stock
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[10%]">
                    Price
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[10%]">
                    Categories
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[10%]">
                    Tags
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[15%]">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="border-gray-300 border-2">
                {filteredProducts?.map((singleItem) => (
                  <tr className="bg-gray-100" key={singleItem._id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <input type="checkbox" className="form-checkbox" />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <img
                        src={singleItem?.images[0]?.url || " "}
                        alt="Product Image"
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[250px]">
                      <div>
                        <p className="font-semibold text-[#2271b1] text-[12px]">
                          {singleItem.title || ""}
                        </p>
                      </div>
                      <div className="flex flex-col flex-wrap gap-0">
                        <div>
                          <p className="font-normal text-[12px]">
                            {singleItem._id}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="text-[#2271b1]"
                            onClick={() =>
                              navigate(`/edit-products/${singleItem._id}`)
                            }
                          >
                            Edit
                          </button>{" "}
                          <span className="text-[#2271b1]">|</span>
                          <button className="text-[#2271b1]">View</button>{" "}
                          <span className="text-[#2271b1]">|</span>
                          <button
                            className="text-[#2271b1]"
                            onClick={() => {
                              setDeleteAlert(true);
                              setDeleteId(singleItem._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-[12px]">
                      {singleItem.variants[0].sku}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-green-700 font-bold text-[12px]">
                      {console.log(singleItem.isStockAvailable)}
                      {singleItem.variants[0].isStockAvailable
                        ? `In Stock (${singleItem.variants[0].length})`
                        : `Out of Stock (${singleItem.variants[0].length})`}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-[12px]">
                      {singleItem.variants[0].currency}{" "}
                      {singleItem.variants[0].price}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-[12px]">
                      {singleItem.categoryID}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-[12px]">
                      {singleItem.tags}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-[12px]">
                      {singleItem.modifiedAt || "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
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
                  deleteProduct(deleteId);
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

export default ProductDetails;
