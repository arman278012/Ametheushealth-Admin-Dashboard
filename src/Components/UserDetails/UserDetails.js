import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  console.log("ID", id);

  const getAllUserbyId = async () => {
    // searchUserQuery = encodeURIComponent(searchUserQuery);
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/user/admin/user/${id}`,
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
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
          <ProfileField label="Auth Method" value={user?.data?.authMethod} />
          <ProfileField label="Date of Birth" value={user?.data?.dateOfBirth} />
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
          <ProfileField label="ID" value={user?.data?.id} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
