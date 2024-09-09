import React, { useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

const Allusers = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState("10");
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };
  return (
    <div>
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
  );
};

export default Allusers;
