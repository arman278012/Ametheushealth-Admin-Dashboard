import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  // State variables for form fields
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("");
  const [deliveryPartner, setDeliveryPartner] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.assetorix.com/ah/api/v1/order/admin/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );
        const orderData = response.data;

        setOrderDetails(orderData);
        console.log(orderData.trackingLink);
        setTrackingNumber(orderData?.trackingLink);

        console.log(trackingNumber);

        // Set initial status from order details
        if (orderData.status) {
          setStatus(orderData.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Update deliveryPartner only when orderDetails first loads
  useEffect(() => {
    if (orderDetails?.deliveryPartner) {
      setDeliveryPartner(orderDetails.deliveryPartner);
    }
  }, [orderDetails]);

  const handleChange = (e) => {
    setDeliveryPartner(e.target.value);
    // Update orderDetails to reflect the change
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      deliveryPartner: e.target.value,
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    // Convert the date to IST
    const options = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-IN", options)
      .format(date)
      .replace(/,/, "");
  }

  const handleFormSubmit = async (updatedStatus) => {
    const updateData = {
      status: updatedStatus, // use the passed status value
      // trackingLink: trackingNumber,
      deliveryPartner,
    };

    try {
      const response = await axios.patch(
        `https://api.assetorix.com/ah/api/v1/order/update-order/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log("Order updated successfully:", response.data);
      toast.success("Order updated successfully");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error updating order");
    }
  };

  return (
    <div>
      <div className="flex flex-col p-5">
        <div>
          <p className="font-bold text-xl flex items-center">Edit Orders</p>
        </div>
      </div>

      <div className="flex p-5 bg-gray-300 gap-5">
        <div className="w-[70%] border border-[gray] p-5 bg-white">
          <div className="flex justify-between">
            <div>
              <p className="border-[gray] text-xl">
                Order{" "}
                <span className="font-bold text-[16px]">
                  {orderDetails?.orderID}{" "}
                </span>{" "}
                details
              </p>
              <p>Payment Gateway: {orderDetails?.payment?.paymentGateway}</p>
              <p>
                Payment order Id:{" "}
                <span className="font-bold text-[16px]">
                  {orderDetails?.payment?.orderId}
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm">
                Created At:{" "}
                <span className="font-bold ">
                  {new Date(orderDetails?.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </p>
              <p className="text-sm">
                Updated At:{" "}
                <span className="font-bold">
                  {new Date(orderDetails?.updatedAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="general mt-5">
              <div>
                <div>
                  <p className="text-[18px] font-semibold">Order Status</p>
                </div>
                <div className="flex flex-col gap-3" style={{ marginTop: "10px" }}>
                  <select
                    id="status"
                    name="status"
                    className="px-3 py-1 sm:w-[170px] w-[230px] focus:outline-none rounded-md bg-white border"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      handleFormSubmit(e.target.value);
                    }}
                  >
                    <option
                      value=""
                      disabled
                      hidden
                      className="placeholder opacity-50 outline-none"
                    >
                      Filter by status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Processing Order">Processing Order</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                <div className="px-3 mt-[35px] py-1 sm:w-[300px] focus:outline-none rounded-md bg-white border w-[300px] border-[1px]">

                  <p className="font-semibold">User details</p>
                  <div className="relative left-[90px] mt-5 w-[70px] h-[70px] bg-gray-200 flex items-center justify-center text-xl font-bold rounded-full overflow-hidden">
                    {orderDetails?.user?.avatar ? (
                      <div>
                        <img
                          src={orderDetails?.user?.avatar}
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <span>
                        {orderDetails?.user?.name
                          ? `${orderDetails?.user?.name.charAt(
                            0
                          )}${orderDetails?.user?.name
                            .split(" ")
                            .slice(-1)[0]
                            .charAt(0)}`
                          : ""}
                      </span>
                    )}
                  </div>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold"> Name:</span>{" "}
                    <span className="text-gray-500 font-thin">
                      {orderDetails?.user?.name}
                    </span>
                  </p>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold"> Id: </span>{" "}
                    <span className="text-gray-500 font-thin">
                      {orderDetails?.user?._id}
                    </span>
                  </p>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold">
                      {" "}
                      Mobile:{" "}
                    </span>{" "}
                    <span className="text-gray-500 font-thin">
                      {orderDetails?.user?.mobile}
                    </span>
                  </p>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold"> DOB:</span>{" "}
                    <span className="text-gray-500 font-thin">
                      {orderDetails?.user?.dateOfBirth
                        ? formatDateTime(orderDetails?.user?.dateOfBirth)
                        : ""}
                    </span>
                  </p>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold">Email:</span>{" "}
                    <span className="text-gray-500 font-thin text-sm">
                      {orderDetails?.user?.email}
                    </span>
                  </p>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold">Gender:</span>{" "}
                    <span className="text-gray-500 font-thin">
                      {orderDetails?.user?.gender}
                    </span>
                  </p>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold"> UHID:</span>{" "}
                    <span className="text-gray-500 font-thin">
                      {orderDetails?.user?.uhid}
                    </span>
                  </p>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold">Role:</span>{" "}
                    <span className="text-gray-500 font-thinx">
                      {" "}
                      {orderDetails?.user?.role}
                    </span>
                  </p>
                  <p className="px-2 text-gray-500">
                    <span className="text-gray-500 font-semibold">
                      Account Type:{" "}
                    </span>{" "}
                    <span className="text-gray-500 font-thin">
                      {orderDetails?.user?.authMethod}
                    </span>
                  </p>
                </div>
                <div className="border p-2 rounded-md shadow-md  w-[300px] mt-[35px]">
                  <p className="text-sm">Order Notes</p>
                  <p className="font-bold"> {orderDetails?.orderNotes}</p>
                </div>
              </div>
            </div>
            <div className="shipping mt-5">
              <p className="text-[18px] font-semibold">Shipping Details</p>
              <p className="">
                <span className="text-gray-500 font-semibold">Name:</span>{" "}
                <span className="text-gray-500 font-thin">
                  {" "}
                  {orderDetails?.name}
                </span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">Email:</span>{" "}
                <span className="text-gray-500 font-thin">
                  {orderDetails?.email}
                </span>
              </p>
              <p>
                <span className="text-gray-500 font-semibold">Mobile:</span>{" "}
                <span className="text-gray-500 font-thin">
                  {orderDetails?.mobile}
                </span>{" "}
              </p>
              <p>
                <span className="text-gray-500 font-semibold">
                  {" "}
                  Company Name:{" "}
                </span>{" "}
                <span className="text-gray-500 font-thin">
                  {" "}
                  {orderDetails?.companyName || "Not mentioned"}
                </span>
              </p>
              <p className="text-gray-500">
                <span className="text-gray-500 font-semibold">Age:</span>{" "}
                <span className="text-gray-500 font-thin">
                  {orderDetails?.age}
                </span>{" "}
              </p>
              <p className="text-gray-500">
                <span className="text-gray-500 font-semibold">
                  Blood Pressure:
                </span>{" "}
                <span className="text-gray-500 font-thin">
                  {orderDetails?.bloodPressure}
                </span>
              </p>
              <p className="text-gray-500">
                <span className="text-gray-500 font-semibold"> Weight: </span>{" "}
                <span className="text-gray-500 font-thin">
                  {orderDetails?.weight || "Not mentioned"}{" "}
                </span>
              </p>
              <p className="text-gray-500">
                <span className="text-gray-500 font-semibold">
                  Weight Unit:
                </span>{" "}
                <span className="text-gray-500 font-thin">
                  {orderDetails?.weightUnit}
                </span>{" "}
              </p>
              <div className="bg-gray-300 h-[1px] w-full mt-2"></div>
              <div className="mt-2">
                <div className="flex flex-col items-start w-full">
                  <p className="text-gray-500 w-full">
                    <span className="text-gray-500 font-semibold block">
                      Street Address:
                    </span>
                    <span className="text-gray-500 font-thin block">
                      {orderDetails?.streetAddress}
                    </span>
                  </p>
                </div>

                <p className="text-gray-500">
                  <span className="text-gray-500 font-semibold">City:</span>{" "}
                  <span className="text-gray-500 font-thin">
                    {" "}
                    {orderDetails?.city}
                  </span>{" "}
                </p>
                <p className="text-gray-500">
                  <span className="text-gray-500 font-semibold"> State:</span>
                  <span className="text-gray-500 font-thin">
                    {" "}
                    {orderDetails?.state}
                  </span>
                </p>
                <p className="text-gray-500">
                  <span className="text-gray-500 font-semibold">Country:</span>{" "}
                  <span className="text-gray-500 font-thin">
                    {orderDetails?.country}
                  </span>
                </p>
                <p className="text-gray-500">
                  <span className="text-gray-500 font-semibold">Pincode:</span>{" "}
                  <span className="text-gray-500 font-thin">
                    {orderDetails?.pincode}
                  </span>
                </p>
              </div>
              <div className="bg-gray-300 h-[1px] w-full mt-2"></div>
              <div className="mt-2">
                <p>
                  {" "}
                  <span className="text-gray-500 font-semibold">
                    {" "}
                    Total Price:
                  </span>{" "}
                  <span className="text-gray-500 font-thin">
                    {orderDetails?.currency} {orderDetails?.totalPrice}
                  </span>
                </p>
                <p>
                  {" "}
                  <span className="text-gray-500 font-semibold">
                    {" "}
                    Delivery Charge:
                  </span>{" "}
                  <span className="text-gray-500 font-thin">
                    {orderDetails?.currency} {orderDetails?.deliveryCharge}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500 font-semibold">
                    Total Cart Price:
                  </span>{" "}
                  <span className="text-gray-500 font-thin">
                    {orderDetails?.currency} {orderDetails?.totalCartPrice}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[30%] ">
          <div className="border border-[gray] p-5 bg-white h-[130px]">
            <div>
              <p className="">Shipment Tracking</p>
              <div className="bg-gray-300 h-[1px] mt-2"></div>
            </div>
            <div className="flex justify-center items-center bg-blue-500 mt-5 p-1">
              <button className="text-white" onClick={toggleSidebar}>
                Add Tracking Info
              </button>
            </div>
          </div>

          <div className="prescription-passport space-y-6">
            <div className="border p-4 rounded-md shadow-md">
              <p className="text-lg font-semibold mb-2">Passport Image</p>
              {orderDetails?.passportImage ? (
                <div className="space-y-2">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={orderDetails.passportImage}
                      alt="Passport"
                      className="w-[200px] rounded-md shadow-sm"
                    />
                    <a
                      href={orderDetails.passportImage}
                      download="passport-image.jpg"
                    >
                      <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Download Passport Image
                      </button>
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No Image Available</p>
              )}
            </div>

            <div className="border p-4 rounded-md shadow-md">
              <p className="text-lg font-semibold mb-2">Prescription Image</p>
              {orderDetails?.prescriptionImage ? (
                <div className="space-y-2 flex flex-col justify-center items-center">
                  <img
                    src={orderDetails.prescriptionImage}
                    alt="Prescription"
                    className="rounded-md shadow-sm"
                  />
                  <a
                    href={orderDetails.prescriptionImage}
                    download="prescription-image.jpg"
                  >
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                      Download Prescription Image
                    </button>
                  </a>
                </div>
              ) : (
                <p className="text-gray-500">No Prescription Image Available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg border-l border-gray-200 z-50 p-5 
            transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tracking Information</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={toggleSidebar}
          >
            ✖
          </button>
        </div>
        <div>
          {/* Add more fields or forms as needed */}
          <form onSubmit={handleFormSubmit} className="mt-5">
            <div className="mb-4">
              <label htmlFor="trackingNumber">Tracking number:</label>
              <input
                type="text"
                id="trackingNumber"
                placeholder="Tracking Number"
                className="w-full p-2 border border-gray-300 rounded"
                value={trackingNumber || ""}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status">Order Status:</label>
              <select
                id="status"
                name="status"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"


                value={status} // Bind to the state variable
                onChange={(e) => {
                  setStatus(e.target.value);
                  handleFormSubmit(e.target.value);
                }}
              >
                <option value="" disabled hidden>
                  status
                </option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing Order">Processing Order</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
                <option value="Delivered">Delivered</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="deliveryPartner">Shipping Provider:</label>
              <select
                id="deliveryPartner"
                name="deliveryPartner"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                value={deliveryPartner}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select shipping provider
                </option>
                <option value="EMS">EMS</option>
                <option value="DHL Express">DHL Express</option>
                <option value="DHL Freight">DHL Freight</option>
                <option value="UPS Global">UPS Global</option>
                <option value="FedEx FIMS">FedEx FIMS</option>
                <option value="Delhivery">Delhivery</option>
                <option value="India Post">India Post</option>
                <option value="DTDC">DTDC</option>
                <option value="Shiprocket">Shiprocket</option>
                <option value="Associated Global System">
                  Associated Global System
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded"
            >
              Fulfill order
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 border-2 p-5">

        <div className="grid grid-cols-3 gap-5">
          {orderDetails?.products?.map((product) => (
            <Link to={`/product-details/${product.productID}`} key={product._id}>
              <div key={product._id} className="shadow-xl p-5">
                <div className=" flex justify-center items-center">
                  <img src={product.images[0]?.url} className=" w-[100px]" />
                </div>
                <div>
                  <p>
                    {" "}
                    <span className="text-gray-500 font-bold">
                      Product Id:
                    </span>{" "}
                    <span className="text-gray-500 font-thin">
                      {product?.productID}
                    </span>
                  </p>
                  <p>
                    {" "}
                    <span className="text-gray-500 font-bold">Name:</span>{" "}
                    <span className="text-gray-500 font-thin">
                      {product?.title}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-500 font-bold">Pack Size: </span>{" "}
                    <span className="text-gray-500 font-thin">
                      {" "}
                      {product?.packSize}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-500 font-bold"> Price: </span>{" "}
                    <span className="text-gray-500 font-thin">
                      {product?.currency}
                      {product?.price}
                    </span>
                  </p>
                  {/* <p>
                  <span className="text-gray-500 font-bold">Sale Price:</span>{" "}
                  <span className="text-gray-500 font-thin">
                    {product?.salePrice}
                  </span>{" "}
                </p> */}

                  <p>
                    <span className="text-gray-500 font-bold">SKU:</span>{" "}
                    <span className="text-gray-500 font-thin">
                      {product?.sku}
                    </span>{" "}
                  </p>

                  <p>
                    <span className="text-gray-500 font-bold">Quantity:</span>{" "}
                    <span className="text-gray-500 font-thin">
                      {product?.quantity}
                    </span>
                  </p>
                  {/* <p>
                  <span className="text-gray-500 font-bold">Margin:</span>{" "}
                  <span className="text-gray-500 font-thin">
                    {product?.margin}
                  </span>
                </p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
