import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import { selectCouponId } from "../../redux/slice/GetCouponIdSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const EditCoupons = () => {
  const [getAllCoupons, setGetAllCoupons] = useState({});
  const { setEditCouponForm } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [coupanData, setCoupanData] = useState({
    code: "",
    discountType: "",
    discountValue: "",
    applicableProducts: [],
    usageLimit: "",
    usageCount: "",
    expiryDate: "",
    isActive: true,
    discountCategory: "",
  });

  const couponId = useSelector(selectCouponId);
  console.log("couponId", couponId);

  const getCoupons = async () => {
    try {
      const response = await axios.get(
        `https://ah-backend-djja.onrender.com/coupon/${couponId}`, // Assuming you fetch a specific coupon by ID
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      const coupon = response.data.data;
      setGetAllCoupons(coupon);

      // Set the form fields based on fetched data
      setCoupanData({
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        applicableProducts: coupon.applicableProducts,
        usageLimit: coupon.usageLimit,
        usageCount: coupon.usageCount,
        expiryDate: coupon.expiryDate,
        isActive: coupon.isActive,
        discountCategory: coupon.discountCategory || "", // Add fallback if the field is missing
      });
      console.log("Coupon Data:", coupanData); // Debugging log
      console.log(coupon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("couponId inside useEffect:", couponId);
    if (couponId) {
      getCoupons();
    }
  }, [couponId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupanData({
      ...coupanData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent form's default behavior
    setLoading(true); // Set loading to true when submission starts
    try {
      const response = await axios.patch(
        `https://ah-backend-djja.onrender.com/coupon/${couponId}`,
        coupanData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log(response.data);
      // Handle success - you may want to show a success message or close the form
    } catch (error) {
      console.log(error);
      // Handle error - you may want to show an error message
    } finally {
      setLoading(false); // Set loading to false when submission completes
      setEditCouponForm(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 z-50 w-[80%] relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          onClick={() => setEditCouponForm(false)}
        >
          <FaTimes size={24} />
        </button>
        <form onSubmit={handleFormSubmit}>
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
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">Discount Value</label>
                <input
                  type="text"
                  value={coupanData.discountValue}
                  name="discountValue"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex space-x-4 max-w-4xl mx-auto mb-5">
              {/* input field for usage limit */}
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">Usage Limit</label>
                <input
                  type="text"
                  value={coupanData.usageLimit}
                  name="usageLimit"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">Usage Count</label>
                <input
                  type="text"
                  value={coupanData.usageCount}
                  name="usageCount"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex space-x-4 max-w-4xl mx-auto mb-5">
              {/* select field for discount type */}
              <div className="w-[440px]">
                <label className="block mb-1">Discount Type</label>
                <Select
                  className="w-full focus:outline-none"
                  value={{
                    label: coupanData.discountType,
                    value: coupanData.discountType,
                  }}
                  options={[{ value: "percentage", label: "Percentage" }]}
                  onChange={(option) =>
                    setCoupanData({ ...coupanData, discountType: option.value })
                  }
                  classNamePrefix="react-select"
                />
              </div>
              <div className="w-[440px]">
                <label className="block mb-1">Active or Not</label>
                <Select
                  className="w-full focus:outline-none"
                  value={{
                    label: coupanData.isActive ? "Active" : "Inactive",
                    value: coupanData.isActive,
                  }}
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "Inactive" },
                  ]}
                  onChange={(option) =>
                    setCoupanData({ ...coupanData, isActive: option.value })
                  }
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
                  name="expiryDate"
                  value={coupanData.expiryDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="w-[440px]">
                <label className="block mb-1">Discount Category</label>
                <Select
                  className="w-full focus:outline-none"
                  value={{
                    label: coupanData.discountCategory || "Select Category",
                    value: coupanData.discountCategory || "",
                  }}
                  options={[
                    { value: "FMCG", label: "FMCG" },
                    { value: "FMHG", label: "FMHG" },
                    { value: "OTC", label: "OTC" },
                  ]}
                  onChange={(option) => {
                    setCoupanData({
                      ...coupanData,
                      discountCategory: option.value,
                    });
                    console.log("Updated discountCategory:", option.value); // Log for debugging
                  }}
                  classNamePrefix="react-select"
                />
              </div>
            </div>
            <div className="flex justify-center items-center p-2">
              <button
                type="submit"
                className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoupons;
