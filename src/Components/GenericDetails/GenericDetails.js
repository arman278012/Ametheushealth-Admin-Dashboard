import React, { useEffect, useState } from "react";
import { selectGenericId } from "../../redux/slice/GetGenericIdSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import parse from "html-react-parser";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const GenericDetails = () => {
  const genericId = useSelector(selectGenericId);
  console.log(genericId);

  const [genericData, setGenericData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const navigate = useNavigate();

  const getGenericDetails = async () => {
    try {
      const response = await axios(
        `https://api.assetorix.com:4100/ah/api/v1/generic/admin/${genericId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log("Data", genericData);
      setGenericData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenericDetails();
  }, []);

  return (
    <>
      <div className="bg-gray-100 p-5">
        <div>
          <p className="font-bold uppercase">{genericData.name}</p>
        </div>
        {/* tables for generics where i will show all the generic data */}
        <Table className="mt-5">
          <Thead>
            <Tr className=" bg-gray-200 w-[100%]">
              <Th className="py-2 px-4 border-b w-[10%]">
                <input type="checkbox" />
              </Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">Name</Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">Id</Th>
              <Th className="py-2 px-4 border-b w-[20%] text-start">
                Treatment
              </Th>
              <Th className="py-2 px-4 border-b w-[30%] text-start">Generic</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading
              ? Array.from({
                  length: genericData.data ? genericData.data.length : 5,
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
              : genericData?.products?.map((product) => (
                  <Tr
                  //   key={item._id}
                  //   onClick={() => dispatch(storeManufacturerId(item._id))}
                  >
                    <Td className="py-2 px-4 border-b text-center">
                      <input type="checkbox" />
                    </Td>
                    <Td className="py-2 px-4 border-b text-[14px]">
                      {product.title}
                      <div className="flex gap-2">
                        <button
                          className="text-[#2271b1]"
                          onClick={() =>
                            navigate(`/edit-products/${product._id}`)
                          }
                        >
                          Edit
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() =>
                            navigate(`/product-details/${product._id}`)
                          }
                        >
                          View
                        </button>{" "}
                        <span className="text-[#2271b1]">|</span>
                        <button
                          className="text-[#2271b1]"
                          onClick={() => {
                            setDeleteId(product._id);
                            setDeleteAlert(true);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product._id}
                    </Td>
                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product.treatment}
                    </Td>

                    <Td className="py-2 px-4 border-b text-start text-[14px]">
                      {product?.generic
                        ? product?.generic
                        : "No Generic Available"}
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
        <div className="parent flex flex-col gap-10 py-5 bg-white">
          <div className="main-content w-[100%] flex flex-col gap-10">
            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="  uppercase">
                Uses of{" "}
                <span className="text-red-500 font-semibold">
                  {genericData.name}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-[170px] mt-1"></div>

              <div className="text-justify">
                {parse(`<p>${genericData?.uses}</p>`)}
              </div>
            </div>

            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="uppercase">
                Side Effects of{" "}
                <span className="text-red-500 font-semibold">
                  {genericData.name}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-[220px] mt-1"></div>
              <div className="text-justify">
                {parse(`<p>${genericData?.sideEffects}</p>`)}
              </div>
            </div>

            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="uppercase">
                Expert Advice for{" "}
                <span className="text-red-500 font-semibold">
                  {genericData.name}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-[235px] mt-1"></div>

              <div className="text-justify">
                {parse(`<p>${genericData?.expertAdvice}</p>`)}
              </div>
            </div>

            <div className="faq w-[100%] bg-gray-100 shadow-md p-5">
              <p className="uppercase">
                Frequently Asked Questions for{" "}
                <span className="text-red-500 font-semibold">
                  {genericData.name}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-[380px] mt-1"></div>

              <div className="text-justify">
                {parse(`<p>${genericData?.faq}</p>`)}
              </div>
            </div>

            <div className="faq w-[100%] bg-gray-100 shadow-md p-5">
              <p className="uppercase">
                Workings of{" "}
                <span className="text-red-500 font-semibold">
                  {genericData.name}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-[210px] mt-1"></div>

              <div className="text-justify">
                {parse(`<p>${genericData?.works}</p>`)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenericDetails;
