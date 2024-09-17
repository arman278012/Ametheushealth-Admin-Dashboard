import React, { useContext, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  getCategoryData,
  setPage,
  setSearchQuery,
} from "../../redux/slice/GetCategoryDataSlice";
import axios, { all } from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppContext } from "../../Context/ContextProvider";
import { storeMyId } from "../../redux/slice/GetIdSlice";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import debounce from "lodash.debounce";

const AllCategories = () => {
  const { allCategoryData, isLoading, currentPage, searchQuery } = useSelector(
    (state) => state.getCategoryData
  );

  console.log("allCategoryData", allCategoryData);

  const { setEditAllCategoriesForm } = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [expanded, setExpanded] = useState({});
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isTopBaropen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState("10");
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    const page = parseInt(params.get("page")) || 1;
    const pageLimit = parseInt(params.get("pagelimit")) || ""; // Default to 10 if pageLimit is not provided

    // Dispatch actions to set the state
    dispatch(setSearchQuery(query));
    dispatch(setPage(page));
    setPageLimit(pageLimit);

    // Fetch category data with updated values
    dispatch(getCategoryData({ page, searchQuery: query, pageLimit }));
  }, [location.search, dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newParams = new URLSearchParams();
      newParams.set("search", searchQuery);
      newParams.set("page", currentPage);
      newParams.set("pagelimit", pageLimit);

      // Update the URL with the new query, page, and pageLimit values
      navigate({ search: newParams.toString() });

      // Fetch category data with updated search and pagination parameters
      dispatch(getCategoryData({ page: currentPage, searchQuery, pageLimit }));
    }, 300); // Debounce delay for smoother search and pagination experience

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage, pageLimit, navigate, dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(setSearchQuery(query));
      dispatch(setPage(1)); // Reset to the first page on a new search
    }, 100),
    []
  );

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    debouncedSearch(query);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.assetorix.com:4100/ah/api/v1/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      allCategoryData();
      dispatch(
        getCategoryData({ page: currentPage, searchQuery, allCategoryData })
      );
      toast.success("Data Deleted Successfully...");
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  const placeholderImage = "https://via.placeholder.com/150";

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBaropen);
  };

  return (
    <div className="overflow-x-auto p-5 ">
      <p className="font-bold text-xl">All Categories</p>
      <div className="mb-2">
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
      </div>

      <div className="main-content-div bg-gray-300 p-5">
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
        <div className="mb-5 flex gap-2 justify-end">
          <input
            type="text"
            className="py-2 rounded-xl px-3 w-[250px]"
            placeholder="Search Categories..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-between mb-5">
          <div className="flex gap-5">
            <button className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl">
              Bulk Delete
            </button>

            <button
              onClick={() => navigate("/add-category")}
              className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl"
            >
              Add Category
            </button>
          </div>

          <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
            <div>
              <p className="font-bold">
                {allCategoryData?.totalCount || 0} Total items
              </p>
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
              <p>{allCategoryData?.page || 0}</p>
            </div>
            <div>
              <p>of {allCategoryData?.totalPages || 0}</p>
            </div>
            <div
              className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
              onClick={() =>
                handlePageChange(
                  Math.min(currentPage + 1, allCategoryData?.totalPages || 1)
                )
              }
            >
              <MdKeyboardArrowRight />
            </div>
            <div
              className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
              onClick={() => handlePageChange(allCategoryData?.totalPages || 1)}
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
        </div>
        <Table className="min-w-full bg-white border border-gray-300 category-table">
          <Thead>
            <Tr className=" bg-gray-200 w-[100%]">
              <Th className="py-2 px-4 border-b w-[5%]">
                <input type="checkbox" />
              </Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[10%]">
                Image
              </Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[15%]">Name</Th>
              {/* <Th className="py-2 px-4 border-b text-start sm:w-[25%] ">
                Description
              </Th> */}
              <Th className="py-2 px-4 border-b text-start sm:w-[15%]">Slug</Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[20%]">Id</Th>
              <Th className="py-2 px-4 border-b text-start sm:w-[10%]">Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading
              ? Array.from({ length: 10 })?.map((_, index) => (
                  <Tr key={index} className="border-t">
                    <Td className="py-2 px-4 border-b text-center">
                      <Skeleton circle={true} height={12} width={12} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-center">
                      <Skeleton circle={true} height={48} width={48} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <Skeleton width={`80%`} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <Skeleton width={`80%`} count={2} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <Skeleton width={`50%`} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <Skeleton width={`50%`} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[13px]">
                      <Skeleton width={`50%`} />
                    </Td>
                  </Tr>
                ))
              : allCategoryData?.data?.map((item, index) => (
                  <Tr
                    key={index}
                    className="border-t"
                    onClick={() => dispatch(storeMyId(item._id))}
                  >
                    <Td className="py-2 px-4 border-b text-center">
                      <input type="checkbox" />
                    </Td>
                    <Td className="py-2 px-4 border-b text-center">
                      <img
                        src={item?.image ? item?.image : placeholderImage}
                        alt={item?.name}
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      {item?.name}
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          onClick={() => setEditAllCategoriesForm(true)}
                        >
                          Edit
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() =>
                            navigate(`/all-categories/${item?._id}`)
                          }
                        >
                          View
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() => {
                            setDeleteAlert(true);
                            setSelectedId(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </Td>
                    {/* <Td className="py-2 px-4 border-b text-[14px]">
                      {item?.description ? (
                        expanded[index] ? (
                          <>{parse(`<p>${item?.description}</p>`)}</>
                        ) : (
                          <>
                            {parse(
                              `<p>${item?.description?.slice(0, 50)}...</p>`
                            )}
                          </>
                        )
                      ) : (
                        <span>No description available</span>
                      )}
                    </Td> */}
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <span className="text-green-600 font-semibold">
                        {item?.slug}
                      </span>
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      <span className="mr-3"> {item?._id}</span>
                    </Td>
                    <Td className="py-2 px-0 border-b text-[13px]">
                      <span className="">
                        {" "}
                        {item?.createdAt?.split("T")[0]}
                      </span>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
        <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start mt-5">
          <div>
            <p className="font-bold">
              {allCategoryData?.totalCount || 0} Total items
            </p>
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
            <p>{allCategoryData?.page || 0}</p>
          </div>
          <div>
            <p>of {allCategoryData?.totalPages || 0}</p>
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            onClick={() =>
              handlePageChange(
                Math.min(currentPage + 1, allCategoryData?.totalPages || 1)
              )
            }
          >
            <MdKeyboardArrowRight />
          </div>
          <div
            className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
            onClick={() => handlePageChange(allCategoryData?.totalPages || 1)}
          >
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>
      </div>

      {deleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg border-2 z-10">
            <p className="text-lg mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleDelete(selectedId);
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

export default AllCategories;
