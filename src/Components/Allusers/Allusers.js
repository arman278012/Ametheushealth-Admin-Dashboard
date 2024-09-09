import React, { useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Allusers = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState("10");
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState(1);

  const navigate = useNavigate();
  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };
  return (
    <div>
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center cursor-pointer">
            All Users
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
      </div>

      <div className="bg-gray-200 sm:w-[100%] md:w-[100%] w-[100%]">
        <div className="flex justify-between mr-5">
          <div className="flex gap-3 p-5">
            <p className="text-xl font-semibold">Users</p>
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
          {/* <div className="left flex gap-3 justify-center items-center sm:justify-normal">
            <div className="all text-sm">All</div>{" "}
            <span className="text-sm">|</span>
            <div className="published text-blue-500 text-sm">
              Published
            </div>{" "}
            <span className="text-sm">|</span>
            <div className="Draft text-blue-500 text-sm">Drafts</div>{" "}
            <span className="text-sm">|</span>
            <div className="Sorting text-blue-500 text-sm">Sorting</div>
          </div> */}
        </div>
        <div className="flex px-5 py-2 gap-3 ">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              //   value={searchQuery}
              //   onChange={handleSearchChange}
              placeholder="Search products here..."
              className="p-3 border rounded-xl h-[45px] w-[300px]"
            />
          </div>
          <div>
            {/* <p>{allProductsData?.totalProducts || 0} results</p> */}
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            // onClick={() => handlePageChange(1)}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            // onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          >
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>{currentUserPage}</p>
          </div>
          <div>{/* <p>of {allProductsData?.totalPages}</p> */}</div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            // onClick={() => handlePageChange(allProductsData?.totalPages || 1)}
          >
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
