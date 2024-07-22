import axios from "axios";
import { Field, Formik } from "formik";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const initialValues = {
  title: "",
  generic: "",
  treatment: "",
  shortDescription: "",
  description: "",
  moreInformation: "",
  faq: "",
  additionalInformation: "",
  sideEffects: "",
  categoryID: "",
  tags: "",
};

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [productTags, setProductTags] = useState(false);
  const [tags, setTags] = useState([]);

  const toggleOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const toggleOpenImageUpload = (e) => {
    e.preventDefault();
    setIsImageOpen(!isImageOpen);
  };

  const toggleProductOpen = (e) => {
    e.preventDefault();
    setProductTags(!productTags);
  };

  const productCategoriesData = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    productCategoriesData();
  }, []);

  const handleTagInputChange = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue("tagsInput", value);
  };

  const handleAddTag = (e, values, setFieldValue) => {
    e.preventDefault();
    const newTags = values.tagsInput
      .split(" ")
      .map((tag) => tag.trim())
      .filter((tag) => tag); // Filter out empty tags
    if (newTags.length > 0) {
      const updatedTags = [...tags, ...newTags];
      setTags(updatedTags);
      setFieldValue("tags", updatedTags.join(", "));
      setFieldValue("tagsInput", ""); // Clear the input field
    }
  };

  const handleRadioChange = (setFieldValue, e) => {
    setFieldValue("categoryID", e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-div-parent p-5 bg-[#f0f0f1]">
      <p className="text-[16px] font-bold">Add Products</p>
      <div className="flex flex-wrap gap-10 border border-gray-300 mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log("Form values:", values);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="flex gap-10 py-5">
              <div className="left w-[70%] flex flex-col gap-3 ml-2">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col w-full">
                    <label className="font-semibold px-2 opacity-65">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Product name"
                      className="h-[35px] border px-2"
                      onChange={handleChange}
                      name="title"
                      value={values.title}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col w-full">
                      <label className="font-semibold px-2 opacity-65">
                        Generic Name
                      </label>
                      <input
                        type="text"
                        placeholder="Generic name"
                        name="generic"
                        value={values.generic}
                        className="h-[35px] border px-2"
                        onChange={handleChange}
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
                        value={values.treatment}
                        name="treatment"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Description</label>
                    <div>
                      <Field name="description">
                        {({ field }) => (
                          <JoditEditor
                            value={values.description}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "description",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.description && touched.description && (
                        <div className="text-red-500">{errors.description}</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Short Description</label>
                    <div>
                      <Field name="shortDescription">
                        {({ field }) => (
                          <JoditEditor
                            value={values.shortDescription}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "shortDescription",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.shortDescription && touched.shortDescription && (
                        <div className="text-red-500">
                          {errors.shortDescription}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">More Information</label>
                    <div>
                      <Field name="moreInformation">
                        {({ field }) => (
                          <JoditEditor
                            value={values.moreInformation}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "moreInformation",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.moreInformation && touched.moreInformation && (
                        <div className="text-red-500">
                          {errors.moreInformation}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Faq</label>
                    <div>
                      <Field name="faq">
                        {({ field }) => (
                          <JoditEditor
                            value={values.faq}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "faq",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.faq && touched.faq && (
                        <div className="text-red-500">{errors.faq}</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">
                      Additional Information
                    </label>
                    <div>
                      <Field name="additionalInformation">
                        {({ field }) => (
                          <JoditEditor
                            value={values.additionalInformation}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "additionalInformation",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.additionalInformation &&
                        touched.additionalInformation && (
                          <div className="text-red-500">
                            {errors.additionalInformation}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Side Effects</label>
                    <div>
                      <Field name="sideEffects">
                        {({ field }) => (
                          <JoditEditor
                            value={values.sideEffects}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "sideEffects",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.sideEffects && touched.sideEffects && (
                        <div className="text-red-500">{errors.sideEffects}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="right w-[30%] mt-5 px-2">
                {/* product categories */}
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
                            type="radio"
                            id={item._id}
                            name="categoryID"
                            value={item._id}
                            className="mr-2"
                            onChange={(e) =>
                              handleRadioChange(setFieldValue, e)
                            }
                            checked={values.categoryID === item._id}
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
                                  type="radio"
                                  id={child._id}
                                  name="categoryID"
                                  value={child._id}
                                  className="mr-2"
                                  onChange={handleChange}
                                  checked={values.categoryID.includes(
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
                                        type="radio"
                                        id={child2._id}
                                        name="categoryID"
                                        value={child2._id}
                                        className="mr-2"
                                        onChange={handleChange}
                                        checked={values.categoryID.includes(
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
                                              type="radio"
                                              id={child3._id}
                                              name="categoryID"
                                              value={child3._id}
                                              className="mr-2"
                                              onChange={handleChange}
                                              checked={values.categoryID.includes(
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
                                                    type="radio"
                                                    id={child4._id}
                                                    name="categoryID"
                                                    value={child4._id}
                                                    className="mr-2"
                                                    onChange={handleChange}
                                                    checked={values.categoryID.includes(
                                                      child4._id
                                                    )}
                                                  />
                                                  <label htmlFor={child4._id}>
                                                    &nbsp; &nbsp; &nbsp; &nbsp;{" "}
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

                <div className="mt-5">
                  <div className="product-tags border rounded-xl p-3 fixed-width-card">
                    <div className="flex justify-between items-center px-3">
                      <label className="font-bold">Product Tags</label>
                      <button
                        onClick={toggleProductOpen}
                        className="focus:outline-none"
                      >
                        {productTags ? (
                          <FaChevronUp className="text-blue-500" />
                        ) : (
                          <FaChevronDown className="text-blue-500" />
                        )}
                      </button>
                    </div>
                    <div
                      className={`tag-list mt-3 ${
                        productTags
                          ? "h-auto overflow-y-auto"
                          : "h-0 overflow-hidden"
                      } transition-all duration-300`}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-around">
                          <Field name="tagsInput">
                            {({ field }) => (
                              <input
                                type="text"
                                placeholder="Enter tags"
                                className="h-[35px] border px-2"
                                {...field}
                                onChange={(e) =>
                                  handleTagInputChange(e, setFieldValue)
                                }
                                value={values.tagsInput}
                              />
                            )}
                          </Field>
                          <button
                            type="button"
                            onClick={(e) =>
                              handleAddTag(e, values, setFieldValue)
                            }
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      {tags.length > 0 && (
                        <div className="mt-3">
                          {tags.map((tag, index) => (
                            <p key={index} className="px-2 py-1">
                              {tag}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* image upload section */}
                <div className="image-upload-section border rounded-xl p-3 mt-5">
                  <div className="flex justify-between items-center px-3">
                    <label className="font-bold">Upload Image</label>
                    <button
                      onClick={toggleOpenImageUpload}
                      className="focus:outline-none"
                    >
                      {isImageOpen ? (
                        <FaChevronUp className="text-blue-500" />
                      ) : (
                        <FaChevronDown className="text-blue-500" />
                      )}
                    </button>
                  </div>
                  <div
                    className={`upload-image mt-3 ${
                      isImageOpen
                        ? "h-auto overflow-y-auto"
                        : "h-0 overflow-hidden"
                    } transition-all duration-300`}
                  >
                    <div className="p-5 w-[250px] flex justify-center items-center flex-col gap-3">
                      <input type="file" className="w-[225px]" />
                      <button className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white py-1 px-2 rounded-md">
                        Upload Images
                      </button>
                      {/* <p>Image upload section is here dfvdfb ed d</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
