import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";

const EditUser = ({ setEditUser, editId, getAllUser }) => {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    mobile: "",
    role: "",
  });
  const [updateBtn, setUpdateBtn] = useState(false);

  console.log(editId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAllUserbyId = async () => {
    // searchUserQuery = encodeURIComponent(searchUserQuery);
    try {
      const response = await axios.get(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/admin/user/${editId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setUser(response.data);
      setFormData({
        name: response.data.data.name,
        gender: response.data.data.gender,
        dateOfBirth: response.data.data.dateOfBirth,
        mobile: response.data.data.mobile,
        role: response.data.data.role,
      });
      console.log("All User Data", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Optionally handle the error with a user-friendly message
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/admin/${editId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setEditUser(false);
      getAllUser();
    }
  };

  useEffect(() => {
    getAllUserbyId();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
      <div className="bg-white p-6 rounded-lg border-2 z-10 w-full max-w-3xl mx-4 md:mx-0 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">Edit User</p>
          <MdCancel
            onClick={() => setEditUser(false)}
            className="cursor-pointer text-gray-500 hover:text-gray-800"
          />
        </div>

        {/* Fields */}
        <form onSubmit={updateUser} className="space-y-4">
          {/* Name and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495AB]"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495AB]"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* DOB and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-[#1495AB]"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495AB]"
              />
            </div>
          </div>

          {/* Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1495AB]"
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#1495AB] text-white py-2 px-4 rounded-lg hover:bg-[#138c9d] transition"
            >
              {updateBtn ? "updating..." : "update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
