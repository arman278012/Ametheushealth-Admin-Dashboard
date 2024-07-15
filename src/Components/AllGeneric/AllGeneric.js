import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const AllGeneric = () => {
  const [genericData, setGenericData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  const allGenericData = async () => {
    try {
      const response = await axios.get(
        "https://api.assetorix.com:4100/ah/api/v1/generic",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    allGenericData();
  }, []);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="overflow-x-auto p-5 bg-gray-300">
      <div className="mb-5 flex gap-2 justify-end">
        <input
          type="text"
          className="py-2 rounded-xl px-3"
          placeholder="Search..."
        />
        <button className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white sm:px-3 px-2 text-sm sm:text-[15px] rounded-xl">
          Search Categories
        </button>
      </div>

      <div className="flex sm:flex-row flex-col justify-between mb-5">
        <button className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl">
          Bulk Delete
        </button>

        <div className="flex sm:px-5 py-2 gap-3 sm:justify-end justify-start">
          <div>
            <p className="font-bold">
              {loading ? <Skeleton width={50} /> : (genericData?.totalCount || 0) + ' Total items'}
            </p>
          </div>
          <div className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer">
            <MdOutlineKeyboardDoubleArrowLeft />
          </div>
          <div className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer">
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
            <p>{loading ? <Skeleton width={20} /> : genericData?.page || 0}</p>
          </div>
          <div>
            <p>of {loading ? <Skeleton width={20} /> : genericData?.totalPages || 0}</p>
          </div>
          <div className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer">
            <MdKeyboardArrowRight />
          </div>
          <div className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer">
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>
      </div>

      <Table className="min-w-full bg-white border border-gray-300">
        <Thead>
          <Tr className=" bg-gray-200 w-[100%]">
            <Th className="py-2 px-4 border-b w-[10%]">
              <input type="checkbox" />
            </Th>
            <Th className="py-2 px-4 border-b w-[20%] text-start">Name</Th>
            <Th className="py-2 px-4 border-b w-[20%] text-start">Slug</Th>
            <Th className="py-2 px-4 border-b w-[50%] text-start">Uses</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading
            ? Array(5)
                .fill('')
                .map((_, index) => (
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
            : genericData.data?.map((item, index) => (
                <Tr key={index}>
                  <Td className="py-2 px-4 border-b text-center">
                    <input type="checkbox" />
                  </Td>
                  <Td className="py-2 px-4 border-b text-[14px]">
                    {item?.name}
                    <div className="flex gap-2">
                      <button className="text-[#2271b1]">
                        Edit
                      </button>{" "}
                      <span className="text-[#2271b1]">|</span>
                      <button className="text-[#2271b1]">
                        View
                      </button>{" "}
                      <span className="text-[#2271b1]">|</span>
                      <button className="text-[#2271b1]">
                        Delete
                      </button>
                    </div>
                  </Td>
                  <Td className="py-2 px-4 border-b text-start text-[14px]">
                    {item?.slug}
                  </Td>
                  <Td className="py-2 px-4 border-b text-start text-[14px]">
                    {item?.uses ? (
                      expanded[index] ? (
                        <>
                          <p>
                            {item.uses}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            {item.uses.slice(0, 70)}...
                            {/* <button
                              onClick={() => toggleExpand(index)}
                              className="text-blue-500 hover:underline"
                            >
                              Show more
                            </button> */}
                          </p>
                        </>
                      )
                    ) : (
                      <>No uses available</>
                    )}
                  </Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default AllGeneric;
