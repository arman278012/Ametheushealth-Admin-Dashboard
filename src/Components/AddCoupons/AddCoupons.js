import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddCoupons = () => {
  const [selectedDiscount, setSelectedDiscount] = useState();
  const [active, setActive] = useState();
  const [selectedCategoryDiscount, setSelectedCategoryDiscount] = useState();
  const [coupanData, setCoupanData] = useState({
    code: "",
    discountType: "percentage",
    discountCategory: "",
    discountValue: "",
    applicableProducts: [],
    usageLimit: "",
    usageCount: "",
    expiryDate: "",
    isActive: true,
  });

  const navigate = useNavigate();

  const discountOptions = [{ value: "percentage", label: "Percentage" }];

  const discountCategoryOptions = [
    { value: "FMCG", label: "FMCG" },
    { value: "FMHG", label: "FMHG" },
    { value: "OTC", label: "OTC" },
  ];

  const handleDiscountChange = (selectedDiscount) => {
    setSelectedDiscount(selectedDiscount);
    setCoupanData((prevData) => ({
      ...prevData,
      discountType: selectedDiscount.value,
    }));
  };

  const handleDiscountCategoryChange = (selectedCategoryDiscount) => {
    setSelectedCategoryDiscount(selectedCategoryDiscount);
    setCoupanData((prevData) => ({
      ...prevData,
      discountCategory: selectedCategoryDiscount.value,
    }));
  };

  const handleActiveChange = (active) => {
    setActive(active);
    setCoupanData((prevData) => ({
      ...prevData,
      isActive: active.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const activeOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the fields to numbers before sending the data
    const dataToSend = {
      ...coupanData,
      discountValue: Number(coupanData.discountValue), // Convert discountValue to a number
      usageLimit: Number(coupanData.usageLimit), // Convert usageLimit to a number
      usageCount: Number(coupanData.usageCount), // Convert usageCount to a number
    };

    console.log(dataToSend);

    try {
      const response = await axios.post(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/coupon`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Coupon Code generated...");
      // navigate("/all-coupons");
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setCoupanData("");
    }
  };

  return (
    <div className="p-5">
      <div>
        <p className="font-bold">Add Coupons</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="flex space-x-4 max-w-4xl mx-auto mb-5">
            {/* input field for code */}
            <div className="flex flex-col w-1/2">
              <label className="block mb-1">Code</label>
              <input
                type="text"
                value={coupanData.code}
                name="code"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="block mb-1">Discount Value</label>
              <input
                type="text"
                value={coupanData.discountValue}
                name="discountValue"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>
          </div>

          <div className="flex space-x-4 max-w-4xl mx-auto mb-5">
            {/* input field for code */}
            <div className="flex flex-col w-1/2">
              <label className="block mb-1">Usage Limit</label>
              <input
                type="text"
                value={coupanData.usageLimit}
                name="usageLimit"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="block mb-1">Usage Count</label>
              <input
                type="text"
                value={coupanData.usageCount}
                name="usageCount"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>
          </div>

          <div className="flex space-x-4 max-w-4xl mx-auto mb-5">
            {/* input field for code */}
            <div className="w-[440px]">
              <label className="block mb-1">Discount Type</label>
              <Select
                className="w-full focus:outline-none"
                value={selectedDiscount}
                options={discountOptions}
                onChange={handleDiscountChange}
                placeholder={
                  selectedDiscount ? selectedDiscount.label : "Select Discount"
                }
                classNamePrefix="react-select"
              />
            </div>
            <div className="w-[440px]">
              <label className="block mb-1">Active or Not</label>
              <Select
                className="w-full focus:outline-none"
                value={active} // Find selected option
                options={activeOptions}
                onChange={handleActiveChange}
                placeholder={active ? active.label : "Choose Active or not"}
                classNamePrefix="react-select"
              />
            </div>
          </div>

          <div className="flex space-x-4 max-w-4xl mx-auto">
            {/* Input field for expiry date */}
            <div className="flex flex-col w-1/2">
              <label className="block mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiryDate" // Name should match the state field
                value={coupanData.expiryDate} // Controlled input field
                onChange={handleChange} // Handle input change
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div className="w-[440px]">
              <label className="block mb-1">Discount Category</label>
              <Select
                className="w-full focus:outline-none"
                value={coupanData.discountCategory}
                options={discountCategoryOptions}
                onChange={handleDiscountCategoryChange}
                placeholder={
                  selectedCategoryDiscount
                    ? selectedCategoryDiscount.label
                    : "Discount Category"
                }
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <div className="flex justify-center items-center p-2">
            <button
              type="submit"
              className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCoupons;
