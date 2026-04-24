import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Prescriptiondetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const { id } = useParams();

  const getPrescriptionDetails = async () => {
    try {
      const response = await axios.get(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/prescription/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setUserDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrescriptionDetails();
  }, []);

  // Function to determine if the file is an image
  const isImage = (fileName) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = fileName?.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Prescription Details</h2>
      <div className="flex flex-col space-y-2">
        <div className="flex gap-2">
          <p className="text-gray-800 font-bold">Name:</p>
          <p className="text-gray-800 font-semibold">{userDetails?.name}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-800 font-bold">Email:</p>
          <p className="text-gray-800 font-semibold">{userDetails?.email}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-800 font-bold">Mobile:</p>
          <p className="text-gray-800 font-semibold">{userDetails?.mobile}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-800 font-bold">Message:</p>
          <p className="text-gray-800 font-semibold">{userDetails?.message}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-600">
            File/Prescription:
          </span>
          {isImage(userDetails?.prescriptionImageURL) ? (
            <div className="mt-4">
              <a
                href={userDetails?.prescriptionImageURL}
                download
                className="text-white bg-blue-500 px-2 py-1"
              >
                Download
              </a>
              <img
                src={userDetails?.prescriptionImageURL}
                alt="Prescription"
                className=" w-[200px] mt-2 border rounded-lg"
              />
            </div>
          ) : (
            <div className="mt-2">
              <a
                href={userDetails?.prescriptionImageURL}
                download
                className="text-blue-500 hover:underline"
              >
                Download
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescriptiondetails;
