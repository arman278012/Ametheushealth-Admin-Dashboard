import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const AllContacts = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [allContactDetails, setAllContactDetails] = useState({
    data: [],
    totalContacts: 0,
    totalPages: 1,
  });

  const navigate = useNavigate();

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const getAllContacts = async (search = "", page = 1, pageLimit = 10) => {
    search = encodeURIComponent(search);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/contact?search=${search}&page=${page}&limit=${pageLimit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setAllContactDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async () => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com/ah/api/v1/contact/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      getAllContacts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllContacts(searchQuery, currentPage, pageLimit);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, pageLimit, currentPage]);

  const goToPage = (page) => {
    if (page > 0 && page <= allContactDetails.totalPages) {
      setCurrentPage(page);
    }
  };

  const [checkedItems, setCheckedItems] = useState([]); // State to track checked rows
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox

  // Function to handle "select all" checkbox
  const handleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    if (isChecked) {
      const allIds = allContactDetails.data.map((contact) => contact._id); // Collect all IDs
      setCheckedItems(allIds); // Select all items
    } else {
      setCheckedItems([]); // Deselect all items
    }
  };

  // Function to handle individual checkbox toggle
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (
    <div>
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center">All Contacts</p>
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
                type="number"
                onChange={(e) => setPageLimit(e.target.value)}
                value={pageLimit}
                className="border-2 rounded-md w-[50px] h-[30px] px-3 text-sm py-2"
                min="1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 sm:w-[100%] md:w-[100%] w-[100%]">
        <div className="flex justify-end mr-5">
          <div className="bg-white h-[30px] px-3 py-1">
            <p
              className="cursor-pointer text-sm flex items-center"
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
          <div className="right flex gap-2 sm:mt-0 mt-5">
            <div>
              <input
                placeholder="search contacts..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-black outline-none px-2 py-1 rounded-md sm:w-full w-[150px]"
              />
            </div>
          </div>
          <div className="flex px-5 py-2 gap-3 justify-end">
            <div>
              <p>{allContactDetails?.totalContacts || 0} results</p>
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => goToPage(1)}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => goToPage(currentPage - 1)}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
              <p>{currentPage}</p>
            </div>
            <div>
              <p>of {allContactDetails?.totalPages || 1}</p>
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === allContactDetails?.totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={() => goToPage(currentPage + 1)}
            >
              <MdKeyboardArrowRight />
            </div>
            <div
              className={`h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer ${
                currentPage === allContactDetails?.totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={() => goToPage(allContactDetails?.totalPages)}
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-5 border-2 p-5">
          <Table>
            <Thead>
              <Tr>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[2%]">
                  <input type="checkbox" className="form-checkbox"  checked={selectAll} onChange={(e) => handleSelectAll(e.target.checked)} />
                </Th>
                <Th className="py-2 px-4 border-b  border-gray-300 text-left w-[10%]">
                  Name
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Email
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Mobile
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[10%]">
                  Message
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {allContactDetails?.data?.map((contact) => (
                <Tr key={contact._id}>
                  <Td className="py-2 px-4 border-b border-gray-300">
                    <input type="checkbox" className="form-checkbox" checked={checkedItems.includes(contact._id)} onChange={() => handleCheckboxChange(contact._id)}  />
                  </Td>
                  <Td className="py-2 px-4 border-b  text-[14px] border-gray-300">
                    <div>
                      <p className="font-semibold text-[#2271b1] text-[12px]">
                        {contact.name || ""}
                      </p>
                    </div>
                    <div className="flex flex-col flex-wrap gap-0">
                      <div>
                        <p className="font-normal text-[12px]">{contact._id}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          onClick={() => {
                            navigate(`/contact-details/${contact._id}`);
                          }}
                        >
                          View
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() => {
                            setDeleteAlert(true);
                            setDeleteId(contact._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {contact.email}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {contact.mobile}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px]">
                    {contact.message}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
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
                  deleteContact(deleteId);
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

export default AllContacts;
