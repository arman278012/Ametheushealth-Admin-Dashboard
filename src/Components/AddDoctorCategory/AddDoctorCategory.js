import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import toast from "react-hot-toast";

const AddDoctorCategory = () => {
  const [doctorData, setDoctorData] = useState({
    specialtyName: "",
    image: null,
    FAQ: [
      {
        title: "",
        value: "",
      },
    ],
    sortDescription: "",
    longDescription: "",
  });

  const editor = useRef(null);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctorData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // Add a new FAQ entry
  const addFAQ = () => {
    setDoctorData((prev) => ({
      ...prev,
      FAQ: [...prev.FAQ, { title: "", value: "" }],
    }));
  };

  // Remove a FAQ entry
  const removeFAQ = (index) => {
    const updatedFAQ = doctorData.FAQ.filter((_, i) => i !== index);
    setDoctorData((prev) => ({
      ...prev,
      FAQ: updatedFAQ,
    }));
  };

  // Handle FAQ change
  const handleFAQChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFAQ = [...doctorData.FAQ];
    updatedFAQ[index][name] = value;

    setDoctorData((prev) => ({
      ...prev,
      FAQ: updatedFAQ,
    }));
  };

  // Submit form data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.assetorix.com/ah/api/v1/dc/admin/category",
        doctorData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );

      if (response.status === 200) {
        toast.success("Doctor category added successfully!");
        // Reset form after successful submission if needed
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      toast.error("Error uploading data, please try again.");
    }
  };

  return (
    <div className="bg-[#f0f0f1]">
      <div className="p-5 sm:w-[60vw] w-[100%] mx-auto">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-center text-2xl">
            Add Doctor's category
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Speciality Name */}
            <div className="flex flex-col gap-2">
              <label className="px-3 font-semibold text-gray-400">
                Speciality Name
              </label>
              <input
                name="specialtyName"
                value={doctorData.specialtyName}
                onChange={handleChange}
                type="text"
                placeholder="Enter name here"
                className="p-3 border rounded-xl h-[45px] focus:outline-none"
              />
            </div>

            {/* Short Description */}
            <div className="flex flex-col gap-2">
              <label className="px-3 font-semibold text-gray-400">
                Short Description
              </label>
              <input
                name="sortDescription"
                value={doctorData.sortDescription}
                onChange={handleChange}
                type="text"
                placeholder="Enter short description here"
                className="p-3 border rounded-xl h-[45px] focus:outline-none"
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label className="px-3 font-semibold text-gray-400">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-3 border rounded-xl focus:outline-none"
              />
            </div>

            {/* FAQ Section */}
            <div className="">
              <p className="px-3 font-semibold text-gray-400">FAQs</p>
              {doctorData.FAQ.map((faq, index) => (
                <div key={index} className="mb-4 flex flex-col">
                  <label className="px-3 font-bold">FAQ Title</label>
                  <input
                    name="title"
                    value={faq.title}
                    onChange={(e) => handleFAQChange(index, e)}
                    type="text"
                    placeholder="Enter FAQ title"
                    className="p-3 border rounded-xl h-[45px] focus:outline-none mb-2"
                  />

                  <label className="px-3 font-bold">FAQ Value</label>
                  <input
                    name="value"
                    value={faq.value}
                    onChange={(e) => handleFAQChange(index, e)}
                    type="text"
                    placeholder="Enter FAQ value"
                    className="p-3 border rounded-xl h-[45px] focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove FAQ
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addFAQ}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
              >
                Add FAQ
              </button>
            </div>

            {/* Jodit Editor for Long Description */}
            <div className="flex flex-col gap-2">
              <label className="px-3 font-semibold text-gray-400">
                Long Description
              </label>
              <JoditEditor
                ref={editor}
                value={doctorData.longDescription}
                onChange={(content) =>
                  setDoctorData((prev) => ({
                    ...prev,
                    longDescription: content,
                  }))
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorCategory;
