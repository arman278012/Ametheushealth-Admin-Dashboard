import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditDoctorCategory = () => {
  const [doctorData, setDoctorData] = useState({
    banner: null,
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
  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
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
 
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctorData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0]
    setDoctorData((prev) => ({
      ...prev,
      banner: file
    }))
  }

  // Remove existing image
  const handleRemoveImage = () => {
    setDoctorData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  // Remove existing image
  const handleRemoveBanner = () => {
    setDoctorData((prev) => ({
      ...prev,
      banner: null,
    }));
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/dc/user/category/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log("All category details", response.data.data);
      const doctor = response.data.data;
      setDoctorData({
        banner: doctor.banner,
        specialtyName: doctor.specialtyName,
        image: doctor.image, // Assume this is a URL
        FAQ: doctor.FAQ,
        sortDescription: doctor.sortDescription,
        longDescription: doctor.longDescription,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("specialtyName", doctorData.specialtyName);
      formData.append("sortDescription", doctorData.sortDescription);
      formData.append("longDescription", doctorData.longDescription);
      formData.append("image", doctorData.image); // Append the image file
      formData.append("banner", doctorData?.banner)
      doctorData.FAQ.forEach((faq, index) => {
        formData.append(`FAQ[${index}][title]`, faq.title);
        formData.append(`FAQ[${index}][value]`, faq.value);
      });

      const response = await axios.patch(
        `https://ah-backend-djja.onrender.com/ah/api/v1/user/dc/admin/category/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Updated Successfully");
      navigate("/all-doctor-category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f0f0f1]">
      <div className="p-5 sm:w-[60vw] w-[100%] mx-auto">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-center text-2xl">
            Edit Doctor's category
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
              {typeof doctorData.image === "string" ? (
                <div className="flex flex-col gap-3">
                  <img
                    src={doctorData.image} // Use the image URL directly
                    alt="Uploaded"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="bg-[#da5151] hover:bg-[#dd3e3e] text-white px-3 py-1 rounded"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="p-3 border rounded-xl focus:outline-none"
                />
              )}
            </div>


            {/* banner Upload */}
            <div className="flex flex-col gap-2">
              <label className="px-3 font-semibold text-gray-400">
                Upload Banner
              </label>
              {typeof doctorData.banner === "string" ? (
                <div className="flex flex-col gap-3">
                  <img
                    src={doctorData.banner} // Use the image URL directly
                    alt="Uploaded"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveBanner}
                    className="bg-[#da5151] hover:bg-[#dd3e3e] text-white px-3 py-1 rounded"
                  >
                    Remove Banner
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="p-3 border rounded-xl focus:outline-none"
                />
              )}
            </div>

            {/* FAQ Section */}
            <div className="">
              <p className="px-3 font-semibold text-gray-400">FAQs</p>
              {doctorData.FAQ.map((faq, index) => (
                <div key={index} className="mb-4 flex flex-col">
                  <label className="px-3 font-bold">Title</label>
                  <input
                    name="title"
                    value={faq.title}
                    onChange={(e) => handleFAQChange(index, e)}
                    type="text"
                    placeholder="Enter title"
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

export default EditDoctorCategory;
