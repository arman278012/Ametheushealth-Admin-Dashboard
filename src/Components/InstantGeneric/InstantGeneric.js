import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const InstantGeneric = () => {
  const [genericData, setGenericData] = useState([]);

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
      setGenericData(response.data);
      toast.success("Data posted Successfully...");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postGenericData();
  };
  return (
    <>
      <div className="max-w-6xl mx-auto flex flex-col justify-center items-center py-5 gap-5">
        <p className="font-bold text-xl">Add generics</p>
        <form onSubmit={handleSubmit}>
          <div className=" flex gap-4">
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
      </div>
    </>
  );
};

export default InstantGeneric;
