import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const InstantGeneric = () => {
  const [genericData, setGenericData] = useState({
    name: "",
    _id: "",
  });

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postGenericData = async () => {
    try {
      const response = await axios.post(
        "https://api.assetorix.com:4100/ah/api/v1/generic",
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericData(response.data.data);
      console.log(genericData);
      toast.success("Data posted successfully...");
      setFormData({ name: "" }); // Clear the input field after adding data
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postGenericData();
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleDelete = () => {
    setGenericData({
      name: "",
      _id: "",
    });
  };

  return (
    <>
      <div className="w-[75vw] mx-auto flex flex-col justify-center items-center py-5 gap-5 border-2">
        <p className="font-bold text-xl">Add generics</p>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter data here..."
                className="p-3 border rounded-xl h-[45px] w-[300px]"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 flex justify-center items-center p-3 border rounded-xl h-[45px] text-white font-bold"
              >
                Add data
              </button>
            </div>
          </form>

          <div className="flex justify-around mt-5 items-center">
            {genericData.name && (
              <div className="flex items-center gap-2 cursor-pointer">
                <p 
                className="cursor-pointer bg-blue-500 px-3 py-1 font-bold text-white"
                onClick={() => handleCopy(genericData.name)}>
                  {genericData.name}
                </p>
              </div>
            )}
            {genericData._id && (
              <div className="flex items-center gap-2 cursor-pointer">
                <p 
                className="cursor-pointer bg-blue-500 px-3 py-1 font-bold text-white"
                onClick={() => handleCopy(genericData._id)}>
                  {genericData._id}
                </p>
              </div>
            )}
          </div>

          {(genericData.name || genericData._id) && (
            <button
              onClick={handleDelete}
              className="mt-5 bg-red-500 hover:bg-red-600 flex justify-center items-center p-3 border rounded-xl h-[45px] text-white font-bold"
            >
              <FaTrash className="mr-2" />
              Delete Both
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InstantGeneric;
