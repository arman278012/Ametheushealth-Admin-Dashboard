import React, { useState } from "react";
import { MdMore } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { LiaQuestionSolid } from "react-icons/lia";
import { MdAssignmentAdd } from "react-icons/md";

const EditDoctorsDetails = () => {
  const [activeSection, setActiveSection] = useState("doctor-details");
  return (
    <>
      <div className="px-5 mt-5">
        <p className="font-bold text-xl flex items-center mb-5">
          Edit Doctors Details
        </p>
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

        {activeSection === "doctor-details" && (
          <div className="flex flex-col gap-2 w-[85%]">
            {/* Doctor name and hospital name */}
            <div className="dr-hospital-name flex gap-5 w-full">
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Doctor name
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Hospital name
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/*Registration no and council name */}
            <div className="dr-hospital-name flex gap-5 w-full">
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Registration No
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Council name
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* doctor status and doctor type */}
            <div className="all-filters flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
              <div className="w-[50%]">
                <p className="px-3 font-semibold text-gray-400">
                  Doctor Status
                </p>
                <select
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                  // value={filterByGender}
                  // onChange={(e) => setFilterByGender(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              <div className="w-[50%]">
                <p className="px-3 font-semibold text-gray-400">Doctor type</p>
                <select
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                  // value={filterByGender}
                  // onChange={(e) => setFilterByGender(e.target.value)}
                >
                  <option value="">Dr Type</option>
                  <option value="normal">Normal</option>
                  <option value="special">Special</option>
                </select>
              </div>
            </div>

            {/* aboutDoctor */}
            <div className="dr-name">
              <label className="px-3 font-semibold text-gray-400">
                About Doctor
              </label>
              <input
                type="text"
                // value={coupanData.usageLimit}
                name="usageLimit"
                // onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        )}

        {activeSection === "faq" && (
          <div className="w-full">
            <div className="mb-4 flex flex-col">
              <label className="px-3 font-semibold text-gray-400">Title</label>
              <input
                name="title"
                // value={faq.title}
                // onChange={(e) => handleFAQChange(index, e)}
                type="text"
                placeholder="Enter title"
                className="p-3 border rounded-xl h-[45px] focus:outline-none mb-2"
              />

              <label className="px-3 font-semibold text-gray-400">
                FAQ Value
              </label>
              <input
                name="value"
                // value={faq.value}
                // onChange={(e) => handleFAQChange(index, e)}
                type="text"
                placeholder="Enter FAQ value"
                className="p-3 border rounded-xl h-[45px] focus:outline-none"
              />

              <button
                type="button"
                // onClick={() => removeFAQ(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-xl"
              >
                Remove FAQ
              </button>
            </div>
          </div>
        )}

        {activeSection === "hospital-address" && (
          <div className="w-full">
            <div className="dr-hospital-name flex gap-5 w-full">
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Permanent Address
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">City</label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>
            <div className="dr-hospital-name flex gap-5 w-full">
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  State
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Pincode
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === "language" && (
          <div className="w-full">
            <div className="dr-name w-full">
              <label className="px-3 font-semibold text-gray-400">
                Languages
              </label>
              <input
                type="text"
                // value={coupanData.usageLimit}
                name="usageLimit"
                // onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none mt-2"
              />
            </div>
          </div>
        )}

        {activeSection === "qualifications" && (
          <div className="w-full flex flex-col gap-2">
            <div className="dr-hospital-name flex gap-5 w-full">
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Degree
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Field of Study
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>
            <div className="dr-name w-[100%]">
              <label className="px-3 font-semibold text-gray-400">
                description
              </label>
              <input
                type="text"
                // value={coupanData.usageLimit}
                name="usageLimit"
                // onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
            <div className="skills">
              <div className="dr-name">
                <label className="px-3 font-semibold text-gray-400">
                  Skills
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === "services" && (
          <div className="w-full">
            <div className="dr-name w-full">
              <label className="px-3 font-semibold text-gray-400">
                Services
              </label>
              <input
                type="text"
                // value={coupanData.usageLimit}
                name="usageLimit"
                // onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none mt-2"
              />
            </div>
          </div>
        )}

        {activeSection === "experience" && (
          <div className="flex flex-col gap-2 w-[85%]">
            {/* Doctor name and hospital name */}
            <div className="dr-hospital-name flex gap-5 w-full">
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Job Title
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Organization Name
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/*Registration no and council name */}
            <div className="dr-hospital-name flex gap-5 w-full">
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Organization Location
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="dr-name w-[50%]">
                <label className="px-3 font-semibold text-gray-400">
                  Sequence Number
                </label>
                <input
                  type="text"
                  // value={coupanData.usageLimit}
                  name="usageLimit"
                  // onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* doctor status and doctor type */}
            <div className="all-filters flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">
              <div className="w-[50%]">
                <p className="px-3 font-semibold text-gray-400">
                  Doctor Status
                </p>
                <select
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                  // value={filterByGender}
                  // onChange={(e) => setFilterByGender(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              <div className="w-[50%]">
                <p className="px-3 font-semibold text-gray-400">Doctor type</p>
                <select
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                  // value={filterByGender}
                  // onChange={(e) => setFilterByGender(e.target.value)}
                >
                  <option value="">Dr Type</option>
                  <option value="normal">Normal</option>
                  <option value="special">Special</option>
                </select>
              </div>
            </div>

            {/* aboutDoctor */}
            <div className="dr-name">
              <label className="px-3 font-semibold text-gray-400">
                About Doctor
              </label>
              <input
                type="text"
                // value={coupanData.usageLimit}
                name="usageLimit"
                // onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditDoctorsDetails;
