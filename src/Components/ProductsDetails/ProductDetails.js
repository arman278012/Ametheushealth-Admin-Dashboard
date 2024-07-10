import React, { useState } from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const ProductDetails = () => {
  const [isTopBaropen, setIsTopBarOpen] = useState(true);

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBaropen);
  };

  return (
    <div className=" ">
      {/* top section is here */}
      <div className="flex flex-col gap-3 p-5">
        <div>
          <p className="font-bold text-xl flex items-center cursor-pointer">
            Products
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
              />
            </div>

            <div className="flex justify-center items-center">
              <button className="bg-[#13a3bc] hover:bg-[#13b6d5] w-[50px] h-[30px] text-white rounded-md text-[13px]">
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
                  isTopBaropen ? "rotate-180" : "rotate-0"
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
                type="text"
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px] "
              />
            </div>

            <div>
              <button className="bg-[#13a3bc] hover:bg-[#13b6d5] outline-none px-2 rounded-md text-white p-[5px]">
                Search Products
              </button>
            </div>
          </div>
        </div>

        <div className="all-filters px-5 py-2 flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
          <select
            id="fruits"
            name="fruits"
            className="px-3 py-1 w-[150px] focus:outline-none rounded-md bg-white sm:block md:block hidden"
          >
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
            <option value="date">Date</option>
            <option value="elderberry">Elderberry</option>
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
              Filter by category
            </option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
            <option value="date">Date</option>
            <option value="elderberry">Elderberry</option>
          </select>

          <select
            id="fruits"
            name="fruits"
            className="px-3 py-1 sm:w-[220px] w-[230px] focus:outline-none rounded-md bg-white"
          >
            <option
              value=""
              selected
              disabled
              hidden
              className="placeholder opacity-50"
            >
              Filter by product type
            </option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
            <option value="date">Date</option>
            <option value="elderberry">Elderberry</option>
          </select>

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
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
            <option value="date">Date</option>
            <option value="elderberry">Elderberry</option>
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
            <p>2949 items</p>
          </div>
          <div className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center">
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center">
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>25 </p>
          </div>
          <div>
            <p>of 59</p>
          </div>
          <div className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center">
            <MdKeyboardArrowRight />
          </div>
          <div className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center">
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>

        {/* table section */}
        <div className="overflow-x-auto mt-5 border-2 p-5">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  <input type="checkbox" className="form-checkbox" />
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Image
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  SKU
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Stock
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Price
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Categories
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Tags
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="border-gray-300 border-2">
              <tr className="bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Product Image"
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200 w-[250px]">
                  <div>
                    <p className="font-semibold text-[#2271b1]">
                      RAHIKA 200MG TABLET
                    </p>
                  </div>
                  <div className="flex flex-col flex-wrap gap-0">
                    <div>
                      <p className="font-normal">ID:19232 </p>
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
                <td className="py-2 px-4 border-b border-gray-200">SKU12345</td>
                <td className="py-2 px-4 border-b border-gray-200 text-green-700 font-bold">
                  In Stock
                </td>
                <td className="py-2 px-4 border-b border-gray-200">$99.99</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  Category 1
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  Tag 1, Tag 2
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  2024-07-02
                </td>
              </tr>

              <tr className="bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Product Image"
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200 w-[250px]">
                  <div>
                    <p className="font-semibold text-[#2271b1]">
                      RAHIKA 200MG TABLET
                    </p>
                  </div>
                  <div className="flex flex-col flex-wrap gap-0">
                    <div>
                      <p className="font-normal">ID:19232 </p>
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
                <td className="py-2 px-4 border-b border-gray-200">SKU12345</td>
                <td className="py-2 px-4 border-b border-gray-200 text-green-700 font-bold">
                  In Stock
                </td>
                <td className="py-2 px-4 border-b border-gray-200">$99.99</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  Category 1
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  Tag 1, Tag 2
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  2024-07-02
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
