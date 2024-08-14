import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ContactDetails = () => {
  const [contactDetailsData, setContactDetailsData] = useState({});

  const { id } = useParams();

  const getContactDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/contact/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setContactDetailsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactDetails();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const firstLetter = name.charAt(0).toUpperCase();
    const lastLetter = name.charAt(name.length - 1).toUpperCase();
    return `${firstLetter}${lastLetter}`;
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 md:flex-row md:justify-between md:max-w-3xl mx-auto my-6">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800">
          {contactDetailsData.name}
        </h2>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Email:</span>{" "}
          {contactDetailsData.email}
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Mobile:</span>{" "}
          {contactDetailsData.mobile}
        </p>
        <p className="text-gray-600 mt-4">
          <span className="font-semibold">Message:</span>{" "}
          {contactDetailsData.message}
        </p>
      </div>
      <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full shadow-md">
          <span className="text-3xl font-bold text-gray-700">
            {getInitials(contactDetailsData.name)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
