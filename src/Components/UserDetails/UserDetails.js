import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAddressCard, FaEdit, FaUserAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { BsBorderWidth } from "react-icons/bs";

const UserDetails = () => {
  const [user, setUser] = useState([]);
  const [activeSection, setActiveSection] = useState("users");
  const { id } = useParams();

  const navigate = useNavigate();

  const getAllUserbyId = async () => {
    // searchUserQuery = encodeURIComponent(searchUserQuery);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/user/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setUser(response.data);
      console.log("All User Data", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Optionally handle the error with a user-friendly message
    }
  };

  useEffect(() => {
    getAllUserbyId();
  }, []);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const convertToIST = (utcDate) => {
    const date = new Date(utcDate);
    // Convert to IST
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
  };

  const ProfileField = ({ label, value }) => (
    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium">{value || "N/A"}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex w-[100%]">
      <div className="w-[20%] flex flex-col gap-2 mt-[200px]">
        <div
          onClick={() => setActiveSection("users")}
          className={`${
            activeSection === "users"
              ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold cursor-pointer"
              : "flex gap-4 cursor-pointer"
          }`}
        >
          <p className="text-sm font-semibold">User</p>
          <FaUserAlt className="mt-[3px] text-[13px]" />
        </div>
        <div className="h-[1px] w-full bg-gray-400"></div>
        <div
          onClick={() => setActiveSection("orders")}
          className={`${
            activeSection === "orders"
              ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold cursor-pointer"
              : "flex gap-4 cursor-pointer"
          }`}
        >
          <p className="text-sm font-semibold">Addresses</p>
          <FaAddressCard className="mt-[3px] text-[13px]" />
        </div>
        <div className="h-[1px] w-full bg-gray-400"></div>
        <div
          onClick={() => setActiveSection("addresses")}
          className={`${
            activeSection === "addresses"
              ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold cursor-pointer"
              : "flex gap-4 cursor-pointer"
          }`}
        >
          <p className="text-sm font-semibold">Orders</p>
          <BsBorderWidth className="mt-[3px] text-[13px]" />
        </div>
      </div>
      <div className="w-[80%]">
        {/* user details */}

        {activeSection === "users" && (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={user?.data?.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
              />
            </div>
            <h1 className="text-center text-2xl font-semibold mb-4">
              {user?.data?.name || "User Name"}
            </h1>
            <div className="space-y-4">
              <ProfileField label="Email" value={user?.data?.email} />
              <ProfileField label="Mobile" value={user?.data?.mobile} />
              <ProfileField
                label="Auth Method"
                value={user?.data?.authMethod}
              />
              <ProfileField
                label="Date of Birth"
                value={user?.data?.dateOfBirth}
              />
              <ProfileField label="Gender" value={user?.data?.gender} />
              <ProfileField
                label="Created Date"
                value={convertToIST(user?.data?.createdDate)}
              />
              <ProfileField
                label="Referral Code"
                value={user?.data?.referralCode}
              />
              <ProfileField label="Role" value={user?.data?.role} />
              <ProfileField label="UHID" value={user?.data?.uhid} />
              <ProfileField label="ID" value={user?.data?._id} />
            </div>
          </div>
        )}

        {/* user orders and user address */}
        {activeSection === "orders" && (
          <div className="max-w-2xl mx-auto p-5">
            <div className="mt-5 shadow-md p-5">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Address List</p>
                </div>

                <div>
                  <p className="text-[#13b6d5] font-bold cursor-pointer">
                    + Add a new address
                  </p>
                </div>
              </div>
              {user?.userAddress?.map((address, index) => (
                <>
                  <div className="bg-black mt-5 h-[1px] w-full opacity-10"></div>
                  <div className="flex justify-between">
                    <p className="font-semibold text-gray-400 text-sm mb-5 mt-2">
                      Saved address {index + 1}
                    </p>
                    <div className="flex gap-5">
                      <button className="">
                        <FaEdit />
                      </button>
                      <button>
                        <MdDelete />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex gap-5">
                      <p className="font-bold text-gray-800">{address?.name}</p>
                      <div className="bg-[#969292] px-3 py-1 font-bold ">
                        <p className="text-white text-sm">
                          {address.addressType}
                        </p>
                      </div>
                      <p className="font-bold">{address?.mobileNumber}</p>
                    </div>
                    <div className="mt-2">
                      <p>
                        {address?.houseNumber}, {address?.locality},{" "}
                        {address?.landmark}, {address?.city}, {address?.state},{" "}
                        {address?.zipcode}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}

        {activeSection === "addresses" && (
          <div className="flex flex-col gap-5 w-[90%] mx-auto">
            {user?.userOrders?.map((order, index) => (
              <div
                key={index}
                className="border px-5 flex flex-col gap-3 shadow-md"
              >
                <div className="mr-5 font-bold mt-5 justify-between flex">
                  <button
                    className="bg-[#54d4ce] px-2"
                    onClick={() => navigate(`/orders-details/${order._id}`)}
                  >
                    View Order
                  </button>
                  <p>
                    {" "}
                    Payment Status:{" "}
                    <span className="bg-orange-600 text-white px-2 py-1">
                      {order?.status}
                    </span>
                  </p>
                </div>
                <div className="h-[1px] w-full bg-black opacity-10"></div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-end mr-5 font-bold">
                      Order ID:{" "}
                      <span className="text-gray-400">{order?.orderID}</span>{" "}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">
                      Date:
                      <span className="font-semibold text-violet-400">
                        {" "}
                        {convertToIST(order?.createdAt)}
                      </span>{" "}
                    </p>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-black opacity-10"></div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      Address:
                      <span className="text-green-500">
                        {" "}
                        {order?.companyName}, {order?.city}, {order?.country},
                        {order?.state}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">
                      Total Cart price:
                      <span className="text-amber-700">
                        {" "}
                        {order?.currency} {order?.totalCartPrice}
                      </span>{" "}
                    </p>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-black opacity-10"></div>
                <div className="grid grid-cols-3 gap-5">
                  {order?.products.map((product, index) => (
                    <div key={index} className="border p-5 mb-5">
                      <div>
                        <img
                          src={product?.images[0]?.url}
                          className="w-[150px] h-[150px]"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-500">
                          {product?.title}
                        </p>
                        <p className="font-bold text-sm text-gray-500">
                          {product?.packSize}
                        </p>
                        <p className="font-bold text-sm text-gray-500">
                          Quantity: {product?.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
