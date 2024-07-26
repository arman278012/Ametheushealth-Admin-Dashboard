import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectManufacturerId } from "../../redux/slice/ManufacturerIdSlice";
import axios from "axios";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ManufacturerProducts = () => {
  const [manufacturersProducts, setManufacturersProducts] = useState([]);
  const [loading, setLoadng] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const manufacturerId = useSelector(selectManufacturerId);

  const navigate = useNavigate();

  const getManufacturersProducts = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/manufacturer/${manufacturerId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log(response.data);
      setManufacturersProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getManufacturersProducts();
  }, []);

  const deleteManufacturerProducts = async (id) => {
    try {
      const response = await axios.patch(
        `https://api.assetorix.com:4100/ah/api/v1/manufacturer/rmid/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Deleted Successfully...");
      getManufacturersProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 px-5 py-2 ">
      <div className="overflow-x-auto p-5 bg-gray-300">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl flex items-center">
            {manufacturersProducts.name}
          </p>
          <p className="font-bold text-xl flex items-center">
            {manufacturersProducts.address}
          </p>
        </div>
      </div>
      <Table className="min-w-full bg-white border border-gray-300">
        <Thead>
          <Tr className=" bg-gray-200 w-[100%]">
            <Th className="py-2 px-4 border-b w-[10%]">
              <input type="checkbox" />
            </Th>
            <Th className="py-2 px-4 border-b w-[20%] text-start">Name</Th>
            <Th className="py-2 px-4 border-b w-[20%] text-start">Id</Th>
            <Th className="py-2 px-4 border-b w-[20%] text-start">Treatment</Th>
            <Th className="py-2 px-4 border-b w-[30%] text-start">Generic</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading
            ? Array.from({
                length: manufacturersProducts.data
                  ? manufacturersProducts.data.length
                  : 5,
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
            : manufacturersProducts?.products?.map((product) => (
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
                          navigate(`/edit-manufacturer-products/${product._id}`)
                        }
                      >
                        Edit
                      </button>{" "}
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        // onClick={() => navigate(`/manufacturer-products`)}
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
                  deleteManufacturerProducts(deleteId);
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

export default ManufacturerProducts;
