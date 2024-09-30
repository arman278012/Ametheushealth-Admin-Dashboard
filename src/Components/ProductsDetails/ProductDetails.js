import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdOutlinePublishedWithChanges,
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
import axios, { all } from "axios";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchOptionQuery, setSearchOptionQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false); // New loading state
  const [storeOptionId, setStoreOptionId] = useState(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [allProductsDetails, setAllProductsDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState("10");
  const [stockAlert, setStockAlert] = useState(false);
  const [stockId, setStockId] = useState("");
  const [stockValue, setStockValue] = useState("");
  const [priceId, setPriceId] = useState("");
  const [pricePopUp, setPricePopUp] = useState(false);
  const [priceAlert, setPriceAlert] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [pageValue, setPageValue] = useState("");

  const searchParams = new URLSearchParams(location.search);

  //Products details API fetching again to solve the searching problem

  const productDetailsAgain = async (page, pageLimit, query) => {
    query = encodeURIComponent(query);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/product/admin/?page=${page}&limit=${pageLimit}&search=${query}&sortBy=title&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setAllProductsDetails(response.data);
      setPageValue(response.data.pageSize);
      console.log("AllProductsDetails", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    const page = parseInt(params.get("page")) || 1;
    const pagelimit = parseInt(params.get("pagelimit")) || "";

    setSearchQuery(query);
    setCurrentPage(page);
    setPageLimit(pagelimit); // Use pagelimit parsed from URL

    productDetailsAgain(page, pagelimit, query);
  }, [location.search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newParams = new URLSearchParams();
      newParams.set("search", searchQuery);
      newParams.set("page", currentPage);
      newParams.set("pagelimit", pageLimit); // Consistent use of pageLimit here

      navigate({ search: newParams.toString() });

      // Call productDetailsAgain with updated values
      productDetailsAgain(currentPage, pageLimit, searchQuery);
    }, 300); // Debounce delay for better UX

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage, pageLimit]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  //-------------------------------------------------------------------

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchTerm, searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchQuery]);

  const toggleDropdown = () => {
    setIsDropOpen(!isDropOpen);
  };

  // Filter API
  const filterOptions = async (query) => {
    if (!query) {
      setFilteredData([]);
      return;
    }
    try {
      setSearchLoading(true);
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/category/view/?search=${query}`,
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
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterOptions(searchOptionQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchOptionQuery]);

  useEffect(() => {
    filterOptions();
  }, []);

  const handleSelectOption = (option) => {
    setStoreOptionId(option._id);
    setSelectedOption(option);
    setSearchQuery(option._id); // Set the search query to the selected option ID
    setIsDropOpen(false); // Close the dropdown
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com/ah/api/v1/product/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      if (response.status === 200) {
        toast.success("Deleted Successfully...");
        productDetailsAgain();
        setSearchQuery("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertToIndianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  const updateStock = async () => {
    const status = stockValue;
    try {
      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/product/status/${stockId}`,
        { status },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setStockValue("");
      setStockAlert(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      productDetailsAgain();
    }
  };

  const updatePrice = async () => {
    const price = { price: priceValue }; // Send price as an object
    try {
      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/product/price/${priceId}`,
        price
      );
      window.location.reload();
      console.log("Price updated successfully", response.data);
    } catch (error) {
      console.log("Error updating price", error);
    }
  };

  const startIndex = (currentPage - 1) * pageValue;

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
                onChange={(e) => setPageLimit(e.target.value)}
                value={pageLimit}
                className="border-2 rounded-md w-[50px] h-[30px] px-3 text-sm py-2"
              />
            </div>
          </div>
        </div>
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

        <div className="flex sm:flex-row flex-col justify-end px-5 py-2">
          <div className="right flex gap-2 sm:mt-0 mt-5">
            <div>
              <input
                placeholder="search products..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
              />
            </div>

            <div></div>
          </div>
        </div>
        <div>
          <div className="all-filters px-5 py-2 flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
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
          </div>

          <div className="flex px-5 py-2 gap-3 justify-end">
            <div>
              <p>{allProductsDetails?.totalProducts || 0} results</p>
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => currentPage > 1 && goToPage(1)}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div className="h-[25px] w-[60px] border-gray-400 border flex justify-center items-center">
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) {
                    setCurrentPage(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    productDetailsAgain(currentPage, pageLimit, searchQuery); // Fetch data for the input page
                  }
                }}
                className="w-full text-center outline-none"
              />
            </div>
            <div>
              <p>of {allProductsDetails?.totalPages || 1}</p>
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === allProductsDetails?.totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={() =>
                currentPage < allProductsDetails?.totalPages &&
                goToPage(currentPage + 1)
              }
            >
              <MdKeyboardArrowRight />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === allProductsDetails?.totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={() =>
                currentPage < allProductsDetails?.totalPages &&
                goToPage(allProductsDetails?.totalPages)
              }
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>

          <div className="overflow-x-auto mt-5 border-2 p-5">
            <Table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[2%]">
                    <p>*</p>
                  </th>
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
                  <th className="py-2 px-4 border-b-2 border-gray-300 text-left w-[15%]">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="border-gray-300 border-2">
                {allProductsDetails?.data?.map((singleItem, index) => (
                  <tr className="bg-gray-100" key={singleItem._id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <p>{startIndex + index + 1}</p>
                    </td>
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
                              navigate(`/edit-products/${singleItem._id}`, {
                                state: { search: searchParams.toString() },
                              })
                            }
                          >
                            Edit
                          </button>{" "}
                          <span className="text-[#2271b1]">|</span>
                          <button
                            className="text-[#2271b1]"
                            onClick={() => {
                              navigate(`/product-details/${singleItem._id}`);
                            }}
                          >
                            View
                          </button>{" "}
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
                      {singleItem?.variants[0]?.sku}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-green-700 font-bold text-[12px]">
                      {console.log(singleItem?.variants[0]?.isStockAvailable)}
                      <div className="flex gap-4">
                        {singleItem?.variants[0]?.isStockAvailable
                          ? `In Stock `
                          : `Out of Stock `}
                        <MdOutlinePublishedWithChanges
                          className="text-xl cursor-pointer"
                          onClick={() => {
                            setStockAlert(true);
                            setStockId(singleItem._id);
                            setStockValue(
                              !singleItem?.variants[0]?.isStockAvailable
                            );
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-[12px]">
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          setPriceAlert(true); // Open price alert
                          setPriceId(singleItem._id); // Set the priceId for the selected item
                          setPriceValue(singleItem?.variants[0]?.price); // Set the initial price value
                        }}
                      >
                        {singleItem?.variants[0]?.currency}{" "}
                        {singleItem?.variants[0]?.price}
                      </p>
                    </td>

                    <td className="py-2 px-4 border-b border-gray-200 text-[12px]">
                      {convertToIndianDate(singleItem.createdAt || "--")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="flex px-5 py-2 gap-3 justify-end">
            <div>
              <p>{allProductsDetails?.totalProducts || 0} results</p>
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => currentPage > 1 && goToPage(1)}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div className="h-[25px] w-[60px] border-gray-400 border flex justify-center items-center">
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) {
                    setCurrentPage(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    productDetailsAgain(currentPage, pageLimit, searchQuery); // Fetch data for the input page
                  }
                }}
                className="w-full text-center outline-none"
              />
            </div>

            <div>
              <p>of {allProductsDetails?.totalPages || 1}</p>
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === allProductsDetails?.totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={() =>
                currentPage < allProductsDetails?.totalPages &&
                goToPage(currentPage + 1)
              }
            >
              <MdKeyboardArrowRight />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === allProductsDetails?.totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={() =>
                currentPage < allProductsDetails?.totalPages &&
                goToPage(allProductsDetails?.totalPages)
              }
            >
              <MdKeyboardDoubleArrowRight />
            </div>
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
      {stockAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg border-2 z-10">
            <p className="text-lg mb-4">
              Are you sure to change status of this Item?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  updateStock();
                  setDeleteAlert(false);
                  setStockId("");
                }}
                className="bg-[#73d173] text-white px-4 py-2 rounded-md mr-2"
              >
                Yes
              </button>
              <button
                onClick={() => setStockAlert(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {priceAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {console.log(priceId)}
          <div className="absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg border-2 z-10 flex flex-col gap-3">
            <p className="text-lg mb-4">
              Are you sure you want to change the price of this item?
            </p>
            <div>
              <input
                type="text"
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  updatePrice(); // Call updatePrice function
                  setPriceAlert(false); // Close the alert
                  setPriceId(""); // Clear the priceId
                }}
                className="bg-[#73d173] text-white px-4 py-2 rounded-md mr-2"
              >
                Yes
              </button>
              <button
                onClick={() => setPriceAlert(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {pricePopUp && <p>Update the price here </p>}
    </div>
  );
};

export default ProductDetails;
