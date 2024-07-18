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

const ProductDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("");

  const categories = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Fig",
    "Grape",
    "Honeydew",
  ];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

  const filteredProducts = searchQuery
    ? allProductsData?.data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProductsData?.data;

  return (
    <div className="">
      {/* top section is here */}
      <div className="flex flex-col gap-3 p-5">
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

            <div className="flex justify-center items-center">
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
            </div>
          </div>
        </div>
        <div className="sm:w-[100%] w-[320px] h-[1px] bg-gray-400"></div>
      </div>

      {/* bottom section is here */}
      <div className="bg-gray-200 sm:w-[100%] md:w-[100%] w-[100%]">
        <div className="flex justify-between mr-5">
          <div className="flex gap-3 p-5">
            <p className="text-xl font-semibold">Products</p>
            <button className="bg-[#13a3bc] text-white font-semibold text-sm p-2 rounded-md shadow-lg hover:bg-[#13b6d5] focus:outline-none focus:ring-opacity-75 transition duration-300 ease-in-out">
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
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px] "
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
            {/* <div>
              <button
                onClick={clearSearch}
                className="bg-[#13a3bc] hover:bg-[#13b6d5] outline-none px-2 rounded-md text-white p-[5px]"
              >
                Clear
              </button>
            </div> */}
          </div>
        </div>

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

          <div className="relative inline-block w-full sm:w-[200px]">
            <button
              className="px-3 py-1 w-full text-left focus:outline-none rounded-md bg-white border"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selected || "Filter by category"}
            </button>
            {isOpen && (
              <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg">
                <input
                  type="text"
                  className="px-3 py-1 w-full focus:outline-none rounded-md"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className="max-h-60 overflow-y-auto">
                  {filteredCategories.map((category, index) => (
                    <li
                      key={index}
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelected(category);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
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
              className="placeholder opacity-50"
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

        {/* Pagination section */}
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

        {/* table section */}
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
                      src={singleItem.images[0].url || " "}
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
                        <button className="text-[#2271b1]">Edit</button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button className="text-[#2271b1]">View</button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button className="text-[#2271b1]">Duplicate</button>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-[12px]">
                    {singleItem.variants[0].sku}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-green-700 font-bold text-[12px]">
                    {singleItem.isStockAvailable ? "In Stock" : "Out of Stock"}
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
  );
};

export default ProductDetails;
