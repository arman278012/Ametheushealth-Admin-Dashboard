import axios from "axios";
import { Field, Formik } from "formik";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const initialValues = {
  shortDescription: "",
  description: "",
  moreInformation: "",
  faq: "",
  additionalInformation: "",
  sideEffects: "",
  categories: [], // Added for handling categories
};

const Addproduct = () => {
  const [loading, setLoading] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const productCategoriesData = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const response = await axios.get(
        "https://api.assetorix.com:4100/ah/api/v1/category/hierarchy-names",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setHierarchyData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once done
    }
  };

  useEffect(() => {
    productCategoriesData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Properly return loading state
  }

  return (
    <div className="main-div-parent p-5 bg-[#f0f0f1]">
      <p className="text-[16px] font-bold">Add Products</p>
      <div className="flex flex-wrap gap-10 mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
            // Handle form submission
          }}
        >
          {({ handleSubmit, handleChange, errors, values, touched }) => (
            <form onSubmit={handleSubmit} className="flex gap-10">
              <div className="left w-full md:w-[70%] flex flex-col gap-3">
                <div className="flex flex-col gap-5">
                  {/* Product Name */}
                  <div className="flex flex-col w-full">
                    <label className="font-semibold px-2 opacity-65">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Product name"
                      className="h-[35px] border px-2"
                      onChange={handleChange}
                      name="productName"
                    />
                  </div>

                  {/* Generic Name and Treatment */}
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col w-full">
                      <label className="font-semibold px-2 opacity-65">
                        Generic Name
                      </label>
                      <input
                        type="text"
                        placeholder="Generic name"
                        className="h-[35px] border px-2"
                        onChange={handleChange}
                        name="genericName"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold px-2 opacity-65">
                        Treatment
                      </label>
                      <input
                        type="text"
                        placeholder="Treatment"
                        className="h-[35px] border px-2"
                        onChange={handleChange}
                        name="treatment"
                      />
                    </div>
                  </div>

                  {/* Jodit Editors */}
                  {[
                    "shortDescription",
                    "description",
                    "additionalInformation",
                    "moreInformation",
                    "faq",
                    "sideEffects",
                  ].map((field, index) => (
                    <div className="mt-5 flex flex-col gap-2" key={index}>
                      <label className="px-3 font-semibold opacity-65">
                        {field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                      <Field name={field}>
                        {({ field }) => (
                          <JoditEditor
                            value={values[field]}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: field,
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors[field] && touched[field] && (
                        <div className="text-red-500">{errors[field]}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="right w-full md:w-[30%] mt-5">
                <div className="product-categories border rounded-xl p-3 fixed-width-card">
                  <div className="flex justify-between items-center px-3">
                    <label className="font-bold">All Categories</label>
                    <button onClick={toggleOpen} className="focus:outline-none">
                      {isOpen ? (
                        <FaChevronUp className="text-blue-500" />
                      ) : (
                        <FaChevronDown className="text-blue-500" />
                      )}
                    </button>
                  </div>
                  <div
                    className={`category-list mt-3 ${
                      isOpen
                        ? "h-[300px] overflow-y-auto"
                        : "h-0 overflow-hidden"
                    } transition-all duration-300`}
                  >
                    {hierarchyData?.map((item) => (
                      <div className="border-2 p-5" key={item._id}>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={item._id}
                            name="categories"
                            value={item._id}
                            className="mr-2"
                            onChange={handleChange}
                            checked={values.categories.includes(item._id)}
                          />
                          <label htmlFor={item._id} className="font-bold">
                            {item.name}
                          </label>
                        </div>
                        {item.children &&
                          item.children.map((child) => (
                            <div key={child._id}>
                              <div className="flex items-center mb-2 ml-4">
                                <input
                                  type="checkbox"
                                  id={child._id}
                                  name="categories"
                                  value={child._id}
                                  className="mr-2"
                                  onChange={handleChange}
                                  checked={values.categories.includes(
                                    child._id
                                  )}
                                />
                                <label htmlFor={child._id}>
                                  &nbsp; {child.name}
                                </label>
                              </div>
                              {child.children &&
                                child.children.map((child2) => (
                                  <div key={child2._id}>
                                    <div className="flex items-center mb-2 ml-8">
                                      <input
                                        type="checkbox"
                                        id={child2._id}
                                        name="categories"
                                        value={child2._id}
                                        className="mr-2"
                                        onChange={handleChange}
                                        checked={values.categories.includes(
                                          child2._id
                                        )}
                                      />
                                      <label htmlFor={child2._id}>
                                        &nbsp; &nbsp; {child2.name}
                                      </label>
                                    </div>
                                    {child2.children &&
                                      child2.children.map((child3) => (
                                        <div key={child3._id}>
                                          <div className="flex items-center mb-2 ml-12">
                                            <input
                                              type="checkbox"
                                              id={child3._id}
                                              name="categories"
                                              value={child3._id}
                                              className="mr-2"
                                              onChange={handleChange}
                                              checked={values.categories.includes(
                                                child3._id
                                              )}
                                            />
                                            <label htmlFor={child3._id}>
                                              &nbsp; &nbsp; &nbsp; {child3.name}
                                            </label>
                                          </div>
                                          {child3.children &&
                                            child3.children.map((child4) => (
                                              <div key={child4._id}>
                                                <div className="flex items-center mb-2 ml-16">
                                                  <input
                                                    type="checkbox"
                                                    id={child4._id}
                                                    name="categories"
                                                    value={child4._id}
                                                    className="mr-2"
                                                    onChange={handleChange}
                                                    checked={values.categories.includes(
                                                      child4._id
                                                    )}
                                                  />
                                                  <label htmlFor={child4._id}>
                                                    &nbsp; &nbsp; &nbsp;&nbsp;{" "}
                                                    {child4.name}
                                                  </label>
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      ))}
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Addproduct;
