import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const DoctorCategoryDetails = () => {
  const [myData, setMyData] = useState();
  const [openFaq, setOpenFaq] = useState(null);
  const { id } = useParams();
  console.log(id);

  const allData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/category/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log("All category details", response.data.data);
      setMyData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index); // Toggle between open/close for each FAQ
  };

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Image */}
      <div className="flex justify-center mb-6">
        <img
          src={myData?.image}
          alt="Doctor's Category Image"
          className="w-48 h-48 rounded-full object-cover shadow-lg"
        />
      </div>

      {/* Specialty Name */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Specialty Name</h2>
        <p className="text-gray-600">{myData?.specialtyName}</p>
      </div>

      {/* Short Description */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Short Description
        </h3>
        <p className="text-gray-600">{myData?.sortDescription}</p>
      </div>

      {/* Long Description */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Long Description
        </h3>
        <p className="text-gray-600">{parse(`${myData?.longDescription}`)}</p>
      </div>

      {/* FAQ */}
      <div className="mb-4 shadow-lg p-2">
        <h3 className="text-xl font-semibold text-gray-800">FAQ</h3>
        {myData?.FAQ?.map((faq, index) => (
          <div key={index} className=" py-2">
            {/* FAQ Title with plus/minus icon */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <p className="text-gray-800 font-medium">{faq.title}</p>
              <span className="text-gray-600">
                {openFaq === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </span>
            </div>

            {/* FAQ Value: Show only when FAQ is expanded */}
            {openFaq === index && (
              <div className="mt-2 text-gray-600">
                <p>{faq.value}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ID */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">ID</h3>
        <p className="text-gray-600">{myData?._id}</p>
      </div>

      {/* Updated At */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Updated At</h3>
        <p className="text-gray-600">{convertToIST(myData?.updatedAt)}</p>
      </div>
    </div>
  );
};

export default DoctorCategoryDetails;
