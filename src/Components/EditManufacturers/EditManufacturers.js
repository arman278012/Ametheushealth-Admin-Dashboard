import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../../Context/ContextProvider";
import { Formik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectManufacturerId } from "../../redux/slice/ManufacturerIdSlice";

const EditManufacturers = () => {
  const [loading, setLoading] = useState(false);
  const [manufacturersData, setManufacturersData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const { setEditManufacturerForm } = useContext(AppContext);

  const manufacturerId = useSelector(selectManufacturerId);

  const getManufacturersData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/manufacturer/${manufacturerId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setManufacturersData(response.data.data);
      console.log("manufacturersData", manufacturersData);
      setFormData({
        name: manufacturersData.name || "",
        address: manufacturersData.address || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getManufacturersData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 z-50 w-[80%] relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          onClick={() => setEditManufacturerForm(false)}
        >
          <FaTimes size={24} />
        </button>

        <form>
          <div className="flex flex-col gap-2 mt-5">
            <label className="px-3 font-bold">Name</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              type="text"
              placeholder="Enter name here"
              className="p-3 border rounded-xl h-[45px]"
            />
            {/* {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )} */}
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label className="px-3 font-bold">Address</label>
            <input
              name="address"
              value={formData.address || "sdfs"}
              onChange={handleChange}
              type="text"
              placeholder="Enter address here"
              className="p-3 border rounded-xl h-[45px]"
            />
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <button
              type="submit"
              className="bg-[#13a3bc] hover:bg-[#13b6d5] rounded-xl flex justify-center items-center p-2 text-white"
            >
              {loading ? "Saving" : "Submit Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditManufacturers;
