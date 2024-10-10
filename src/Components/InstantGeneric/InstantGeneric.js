import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeGenericId } from "../../redux/slice/GetGenericIdSlice";
import { AppContext } from "../../Context/ContextProvider";
import parse from "html-react-parser";
import { MdDelete } from "react-icons/md";

const InstantGeneric = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [allGenericData, setAllGenericData] = useState({});
  const [genericData, setGenericData] = useState({
    name: "",
    _id: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setEditGenericForm } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSearchQuery(e.target.value);
  };

  const postGenericData = async () => {
    try {
      const response = await axios.post(
        "https://api.assetorix.com/ah/api/v1/generic",
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericData(response.data.data);
      console.log(genericData);
      toast.success("Data posted successfully...");
      setFormData({ name: "" }); // Clear the input field after adding data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postGenericData();
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleDelete = () => {
    setGenericData({
      name: "",
      _id: "",
    });
  };

  const searchGeneric = async (query, page) => {
    setLoading(true);
    query = encodeURIComponent(query);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/generic/?page=${page}&search=${query}&limit=${9}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setAllGenericData(response.data);
      console.log(genericData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchGeneric(searchQuery, currentPage);
      } else {
        searchGeneric("", currentPage);
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  //delete generic data
  const deleteGenericData = async (id) => {
    try {
      await axios.delete(
        `https://api.assetorix.com/ah/api/v1/generic/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Deleted Successfully...");
      setDeleteAlert(false);
      allGenericData(searchQuery, currentPage); // Reload current page data after deletion
    } catch (error) {
      console.log(error);
    } finally {
      searchGeneric();
    }
  };

  //for checks

  const [checkedItems, setCheckedItems] = useState({}); // Track checked items

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the checked status for the specific item
    }));
  };

  const handleSelectAll = (isChecked) => {
    const updatedCheckedItems = {};
    allGenericData.data.forEach((item) => {
      updatedCheckedItems[item._id] = isChecked; // Set all checkboxes to the same value
    });
    setCheckedItems(updatedCheckedItems);
  };
  
  return (
    <>
      <div className="w-full mx-auto flex justify-center items-center py-1 gap-5">
        <div className="w-[50%] flex flex-col gap-2 border-2 p-5">
          <div className="flex justify-start">
            <p className="font-bold text-xl -mt-4 text-start">Generics</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="search data here..."
                  className="p-3 border rounded-xl h-[45px] w-[300px]"
                />
                {/* <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 flex justify-center items-center p-3 border rounded-xl h-[45px] text-white font-bold"
                >
                  Search
                </button> */}
              </div>
            </form>
          </div>
        </div>

        <div className="w-[50%] border-2 flex flex-col justify-center items-center p-5">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter data here..."
                className="p-3 border rounded-xl h-[45px] w-[300px]"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 flex justify-center items-center p-3 border rounded-xl h-[45px] text-white font-bold"
              >
                Add data
              </button>
            </div>
          </form>

          <div className="flex gap-5 mt-5">
            {genericData.name && (
              <div className="flex items-center gap-2 cursor-pointer">
                <p
                  className="cursor-pointer bg-blue-500 px-3 py-1 font-bold text-white"
                  onClick={() => handleCopy(genericData.name)}
                >
                  {genericData.name}
                </p>
              </div>
            )}
            {genericData._id && (
              <div className="flex items-center gap-2 cursor-pointer">
                <p
                  className="cursor-pointer bg-blue-500 px-3 py-1 font-bold text-white"
                  onClick={() => handleCopy(genericData._id)}
                >
                  {genericData._id}
                </p>
              </div>
            )}
            {(genericData.name || genericData._id) && (
              <button
                onClick={handleDelete}
                className="cursor-pointer bg-red-500 px-2 font-bold text-white"
              >
                <FaTrash className="" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
        <div>
          <p className="font-bold">
            {loading ? (
              <Skeleton width={50} />
            ) : (
              (allGenericData?.totalCount || 0) + " Total items"
            )}
          </p>
        </div>
        <div
          className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
          onClick={() => goToPage(1)}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </div>
        <div
          className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
          onClick={() => goToPage(allGenericData?.page - 1)}
        >
          <MdOutlineKeyboardArrowLeft />
        </div>
        <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
          <p>{loading ? <Skeleton width={20} /> : allGenericData?.page || 0}</p>
        </div>
        <div>
          <p>
            of{" "}
            {loading ? (
              <Skeleton width={20} />
            ) : (
              allGenericData?.totalPages || 0
            )}
          </p>
        </div>
        <div
          className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
          onClick={() => goToPage(allGenericData?.page + 1)}
        >
          <MdKeyboardArrowRight />
        </div>
        <div
          className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
          onClick={() => goToPage(allGenericData?.totalPages)}
        >
          <MdKeyboardDoubleArrowRight />
        </div>
      </div>

      <div className="h-[500px]">
        <Table className="min-w-full bg-white border border-gray-300]">
          <Thead>
            <Tr className=" bg-gray-200 w-[100%]">
              <Th className="py-2 px-4 border-b w-[10%]">
                <input type="checkbox" checked={Object.values(checkedItems).every(Boolean)} onChange={(e) => handleSelectAll(e.target.checked)} />
              </Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">Name</Th>
              <Th className="py-2 px-4 border-b w-[10%] text-start">Slug</Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">Id</Th>
              <Th className="py-2 px-4 border-b w-[30%] text-start">Uses</Th>
              <Th className="py-2 px-4 border-b w-[10%] text-start">Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading
              ? Array.from({
                  length: allGenericData.data ? allGenericData.data.length : 5,
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
              : allGenericData.data?.map((item) => (
                  <Tr
                    key={item._id}
                    onClick={() => dispatch(storeGenericId(item._id))}
                  >
                    <Td className="py-2 px-4 border-b text-center">
                      <input type="checkbox"  checked={checkedItems[item._id] || false} onChange={() => handleCheckboxChange(item._id)} />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      {item?.name}
                      {/* <div className="flex gap-2">
                      <button
                        className="text-[#2271b1]"
                        onClick={() => setEditGenericForm(true)}
                      >
                        Edit
                      </button>{" "}
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        onClick={() => navigate(`/generic-details`)}
                      >
                        View
                      </button>{" "}
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        onClick={() => {
                          setDeleteAlert(true);
                          setDeleteId(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </div> */}
                    </Td>

                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {item?.slug}
                    </Td>
                    <Td
                      className="py-2 px-4 border-b text-start text-[14px] cursor-pointer"
                      onClick={() => handleCopy(item?._id)}
                    >
                      {item?._id}
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {item?.uses ? (
                        expanded[item._id] ? (
                          <>{parse(`<p>${item?.uses}</p>`)}</>
                        ) : (
                          <>{parse(`<p>${item.uses.slice(0, 50)}...</p>`)}</>
                        )
                      ) : (
                        <>No uses available</>
                      )}
                    </Td>
                    <Td
                      className="py-2 px-4 border-b text-start text-[14px] cursor-pointer"
                      onClick={() => {
                        setDeleteAlert(true);
                        setDeleteId(item._id);
                      }}
                    >
                      <MdDelete className="text-red-500" />
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
                    deleteGenericData(deleteId);
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
    </>
  );
};

export default InstantGeneric;
