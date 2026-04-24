import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  address: "",
};

const AddManufacturer = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const postManufacturerData = async (values) => {
    try {
      const response = await axios.post(
        "https://ah-backend-djja.onrender.com/manufacturer",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      navigate("/all-manufacturers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f0f0f1] ">
      <div className="p-5 sm:w-[60vw] w-[100%] mx-auto">
        <p className="font-bold">Add Manufacturer</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            postManufacturerData(values);
          }}
        >
          {({ handleSubmit, handleChange, errors, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mt-5">
                <label className="px-3 font-bold">Name</label>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter name here"
                  className="p-3 border rounded-xl h-[45px] focus:outline-none"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500">{errors.name}</div>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <label className="px-3 font-bold">Address</label>
                <input
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter address here"
                  className="p-3 border rounded-xl h-[45px] focus:outline-none"
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddManufacturer;
