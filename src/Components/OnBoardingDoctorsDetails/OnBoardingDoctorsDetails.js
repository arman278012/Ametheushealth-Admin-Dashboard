import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdMore } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { LiaQuestionSolid } from "react-icons/lia";
import { MdAssignmentAdd } from "react-icons/md";

const OnBoardingDoctorsDetails = () => {
  const [onBoardingData, setOnBoardingData] = useState([]);
  const [activeSection, setActiveSection] = useState("doctor-details");
  const { id } = useParams();

  const onboardingDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/admin/doctor/processing/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setOnBoardingData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onboardingDetails();
  }, []);

  return (
    <>
      <div className="px-5 mt-5 flex justify-between">
        <p className="font-bold text-xl flex items-center mb-5">
          Edit onboarding Doctors Details
        </p>
        <div>
          <div className="w-64 mx-auto mt-5">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Status
            </label>
            <select
              id="status"
              name="status"
              className="block w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="processing" className="text-gray-600">
                Processing
              </option>
              <option value="reject" className="text-gray-600">
                Reject
              </option>
              <option value="accept" className="text-gray-600">
                Accept
              </option>
              <option value="pending" className="text-gray-600">
                Pending
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-10 p-5">
        <div className="left-section-sidebar w-[25%]">
          <div className="">
            <div className="flex flex-col gap-3 p-3">
              <div
                className={`${
                  activeSection === "doctor-details"
                    ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                    : "flex gap-2"
                }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("doctor-details")}
                >
                  Doctor-details
                </button>
                <MdOutlineDescription className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              <div
                className={`${
                  activeSection === "hospital-address"
                    ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                    : "flex gap-2"
                }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("hospital-address")}
                >
                  Hospital-Address
                </button>
                <MdOutlineDescription className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              <div
                className={`${
                  activeSection === "language"
                    ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                    : " flex gap-2"
                }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("language")}
                >
                  Language
                </button>
                <MdOutlineDescription className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              <div
                className={`${
                  activeSection === "qualifications"
                    ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                    : " flex gap-2"
                }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("qualifications")}
                >
                  Qualifications
                </button>
                <MdMore className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              <div
                className={`${
                  activeSection === "faq"
                    ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                    : " flex gap-2"
                }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("faq")}
                >
                  Faq
                </button>
                <LiaQuestionSolid className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              <div
                className={`${
                  activeSection === "services"
                    ? "bg-blue-500 text-white flex gap-2 py-1 px-2 text-[12px] font-bold"
                    : " flex gap-2 text-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveSection("services")}
                >
                  Services
                </button>
                <MdAssignmentAdd className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              {/* Experience */}
              <div
                className={`${
                  activeSection === "experience"
                    ? "bg-blue-500 text-white flex gap-2 py-1 px-2 text-[12px] font-bold"
                    : " flex gap-2 text-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveSection("experience")}
                >
                  Experience
                </button>
                <MdAssignmentAdd className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnBoardingDoctorsDetails;
