import axios from "axios";
import { Field, FieldArray, Formik } from "formik";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdMore } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { LiaQuestionSolid } from "react-icons/lia";
import { MdAssignmentAdd } from "react-icons/md";
import { DiHtml53dEffects } from "react-icons/di";
import { PiSelectionSlashFill } from "react-icons/pi";

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
  genericID: "",
  isReturnable: false,
  isPrescriptionRequired: true,
  isVisible: true,
  isFeatured: false,
  isDiscontinued: false,
  purchaseNote: "",
  externalLink: "",
  position: "",
  metaTitle: "",
  metaDescription: "",
  metaTags: "",
  variants: [{}],
};

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [productTags, setProductTags] = useState(false);
  const [tags, setTags] = useState([]);
  const [storeMetaTag, setStoreMetaTag] = useState([]);
  const [genericsopen, setGenericsOpen] = useState(false);
  const [genericsMap, setGenericMap] = useState([]);
  const [activeSection, setActiveSection] = useState("name");

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

  const toggleGenericsOpen = (e) => {
    e.preventDefault();
    setGenericsOpen(!genericsopen);
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

  const genericsData = async () => {
    try {
      const response = await axios.get(
        "https://api.assetorix.com:4100/ah/api/v1/generic/names",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericMap(response.data);
      console.log("generic data", genericsMap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productCategoriesData();
    genericsData();
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

  const handleMetaTagInputChange = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue("metaTagsInput", value);
  };

  const handleAddMetaTag = (e, values, setFieldValue) => {
    e.preventDefault();
    const newMetaTags = values.metaTagsInput
      .split(" ")
      .map((metaTag) => metaTag.trim())
      .filter((metaTag) => metaTag); // Filter out empty tags
    if (newMetaTags.length > 0) {
      const updatedMetaTags = [...storeMetaTag, ...newMetaTags];
      setStoreMetaTag(updatedMetaTags);
      setFieldValue("metaTags", updatedMetaTags.join(", "));
      setFieldValue("metaTagsInput", ""); // Clear the input field
    }
  };

  const handleRadioChange = (setFieldValue, e) => {
    setFieldValue("categoryID", e.target.value);
  };

  const handleGenericsChange = (setFieldValue, e) => {
    setFieldValue("genericID", e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-div-parent p-5 bg-[#f0f0f1]">
      <p className="text-[16px] font-bold">Add Products</p>
      <div></div>
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
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 w-[100%] main-parent">
                <div className="w-[75%] flex gap-5">
                  <div className="flex w-[100%] justify-between">
                    <div className="flex flex-col gap-3 w-[30%] p-3">
                      <div
                        className={`${
                          activeSection === "name"
                            ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                            : " flex gap-2"
                        }`}
                      >
                        <button onClick={() => setActiveSection("name")}>
                          Names
                        </button>
                        <MdDriveFileRenameOutline className="mt-1 text-sm" />
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>

                      <div
                        className={`${
                          activeSection === "description"
                            ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                            : "flex gap-2"
                        }`}
                      >
                        <button
                          className="text-sm"
                          onClick={() => setActiveSection("description")}
                        >
                          Description
                        </button>
                        <MdOutlineDescription className="mt-1 text-sm" />
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>

                      <div
                        className={`${
                          activeSection === "shortDescription"
                            ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                            : " flex gap-2"
                        }`}
                      >
                        <button
                          className="text-sm"
                          onClick={() => setActiveSection("shortDescription")}
                        >
                          Short Description
                        </button>
                        <MdOutlineDescription className="mt-1 text-sm" />
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>

                      <div
                        className={`${
                          activeSection === "moreInformation"
                            ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                            : " flex gap-2"
                        }`}
                      >
                        <button
                          className="text-sm"
                          onClick={() => setActiveSection("moreInformation")}
                        >
                          More Information
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
                          activeSection === "additionalInformation"
                            ? "bg-blue-500 text-white flex gap-2 py-1 px-2 text-[12px] font-bold"
                            : " flex gap-2 text-sm"
                        }`}
                      >
                        <button
                          onClick={() =>
                            setActiveSection("additionalInformation")
                          }
                        >
                          Additional Information
                        </button>
                        <MdAssignmentAdd className="mt-1 text-sm" />
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>

                      <div
                        className={`${
                          activeSection === "sideEffects"
                            ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                            : " flex gap-2"
                        }`}
                      >
                        <button
                          className="text-sm"
                          onClick={() => setActiveSection("sideEffects")}
                        >
                          Side Effects
                        </button>
                        <DiHtml53dEffects className="mt-1 text-sm" />
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>

                      <div
                        className={`${
                          activeSection === "yes-no"
                            ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                            : " flex gap-2"
                        }`}
                      >
                        <button
                          className="text-sm"
                          onClick={() => setActiveSection("yes-no")}
                        >
                          Selections
                        </button>
                        <PiSelectionSlashFill className="mt-1 text-sm" />
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>

                      <div
                        className={`${
                          activeSection === "meta"
                            ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                            : " flex gap-2"
                        }`}
                      >
                        <button
                          className="text-sm"
                          onClick={() => setActiveSection("meta")}
                        >
                          Meta
                        </button>
                        <PiSelectionSlashFill className="mt-1 text-sm" />
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>

                      <div
                        className={`${
                          activeSection === "variants"
                            ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                            : " flex gap-2"
                        }`}
                      >
                        <button
                          className="text-sm"
                          onClick={() => setActiveSection("variants")}
                        >
                          Variants
                        </button>
                        <PiSelectionSlashFill className="mt-1 text-sm" />
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                    </div>

                    <div className="flex flex-col gap-5 left  p-3 border w-[70%] mt-5">
                      {activeSection === "name" && (
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
                          <div className="flex flex-col w-full">
                            <label className="font-semibold px-2 opacity-65">
                              Purchase Note
                            </label>
                            <input
                              type="text"
                              placeholder="Purchase Note"
                              className="h-[35px] border px-2"
                              onChange={handleChange}
                              value={values.purchaseNote}
                              name="purchaseNote"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <label className="font-semibold px-2 opacity-65">
                              External Link
                            </label>
                            <input
                              type="text"
                              placeholder="External Link"
                              className="h-[35px] border px-2"
                              onChange={handleChange}
                              value={values.externalLink}
                              name="externalLink"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <label className="font-semibold px-2 opacity-65">
                              Position
                            </label>
                            <input
                              type="text"
                              placeholder="Position"
                              className="h-[35px] border px-2"
                              onChange={handleChange}
                              value={values.position}
                              name="position"
                            />
                          </div>
                        </div>
                      )}

                      {activeSection === "description" && (
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
                              <div className="text-red-500">
                                {errors.description}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {activeSection === "shortDescription" && (
                        <div className="mt-5 flex flex-col gap-2">
                          <label className="px-3 font-bold">
                            Short Description
                          </label>
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
                            {errors.shortDescription &&
                              touched.shortDescription && (
                                <div className="text-red-500">
                                  {errors.shortDescription}
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                      {activeSection === "moreInformation" && (
                        <div className="mt-5 flex flex-col gap-2">
                          <label className="px-3 font-bold">
                            More Information
                          </label>
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
                            {errors.moreInformation &&
                              touched.moreInformation && (
                                <div className="text-red-500">
                                  {errors.moreInformation}
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                      {activeSection === "faq" && (
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
                      )}

                      {activeSection === "additionalInformation" && (
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
                      )}

                      {activeSection === "sideEffects" && (
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
                              <div className="text-red-500">
                                {errors.sideEffects}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {activeSection === "yes-no" && (
                        <div className="flex flex-col gap-10 justify-center items-center">
                          <div className="flex gap-10">
                            <div className="flex flex-col gap-2">
                              <label className="px-3 font-bold">
                                IsReturnable?
                              </label>
                              <div className="relative inline-block text-left">
                                <Field
                                  as="select"
                                  name="isReturnable"
                                  value={values.isReturnable}
                                  onChange={(event) => {
                                    const value = event.target.value === "true";
                                    setFieldValue("isReturnable", value);
                                  }}
                                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                                >
                                  <option disabled>Select an option</option>
                                  <option value={false}>No</option>
                                  <option value={true}>Yes</option>
                                </Field>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="px-3 font-bold">
                                IsPrescriptionRequired?
                              </label>
                              <div className="relative inline-block text-left">
                                <Field
                                  as="select"
                                  name="isPrescriptionRequired"
                                  value={values.isPrescriptionRequired}
                                  onChange={(event) => {
                                    const value = event.target.value === "true";
                                    setFieldValue(
                                      "isPrescriptionRequired",
                                      value
                                    );
                                  }}
                                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                                >
                                  <option disabled>Select an option</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Field>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-10">
                            <div className="flex flex-col gap-2">
                              <label className="px-3 font-bold">
                                IsVisible?
                              </label>
                              <div className="relative inline-block text-left">
                                <Field
                                  as="select"
                                  name="isVisible"
                                  value={values.isVisible}
                                  onChange={(event) => {
                                    const value = event.target.value === "true";
                                    setFieldValue("isVisible", value);
                                  }}
                                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                                >
                                  <option disabled>Select an option</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Field>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="px-3 font-bold">
                                IsFeatured?
                              </label>
                              <div className="relative inline-block text-left">
                                <Field
                                  as="select"
                                  name="isFeatured"
                                  value={values.isFeatured}
                                  onChange={(event) => {
                                    const value = event.target.value === "true";
                                    setFieldValue("isFeatured", value);
                                  }}
                                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                                >
                                  <option disabled>Select an option</option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Field>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col justify-start gap-2">
                            <label className="px-3 font-bold">
                              IsDiscontinued?
                            </label>
                            <div className="relative inline-block text-left">
                              <Field
                                as="select"
                                name="isDiscontinued"
                                value={values.isDiscontinued}
                                onChange={(event) => {
                                  const value = event.target.value === "true";
                                  setFieldValue("isDiscontinued", value);
                                }}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                              >
                                <option disabled>Select an option</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </Field>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeSection === "meta" && (
                        <>
                          <div className="flex flex-col gap-5 justify-center w-[500px]">
                            <div className="flex flex-col w-full">
                              <label className="font-semibold px-2 opacity-65">
                                Meta Title
                              </label>
                              <input
                                type="text"
                                placeholder="Title"
                                className="h-[35px] border px-2"
                                onChange={handleChange}
                                name="metaTitle"
                                value={values.metaTitle}
                              />
                            </div>

                            <div className="flex flex-col w-full">
                              <label className="font-semibold px-2 opacity-65">
                                Meta Description
                              </label>
                              <input
                                type="text"
                                placeholder="Description"
                                className="h-[35px] border px-2"
                                onChange={handleChange}
                                name="metaDescription"
                                value={values.metaDescription}
                              />
                            </div>

                            <div className="flex flex-col w-full">
                              <label className="font-semibold px-2 opacity-65">
                                Meta Tags
                              </label>
                              <div className="flex gap-3">
                                <Field name="metaTagsInput">
                                  {({ field }) => (
                                    <input
                                      type="text"
                                      placeholder="Enter tags"
                                      className="h-[35px] border px-2 w-[400px]"
                                      {...field}
                                      onChange={(e) =>
                                        handleMetaTagInputChange(
                                          e,
                                          setFieldValue
                                        )
                                      }
                                      value={values.metaTagsInput}
                                    />
                                  )}
                                </Field>
                                <button
                                  onClick={(e) =>
                                    handleAddMetaTag(e, values, setFieldValue)
                                  }
                                  className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                  Add Tags
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {activeSection === "variants" && (
                        <div className="w-[500px] flex flex-col gap-5">
                          <FieldArray name="variants">
                            {({ push, remove }) => (
                              <>
                                {values.variants.map((variant, index) => (
                                  <div
                                    key={index}
                                    className="w-[500px] flex flex-col gap-3"
                                  >
                                    <div className="flex gap-4">
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          SKU
                                        </label>
                                        <Field
                                          name={`variants[${index}].sku`}
                                          type="text"
                                          placeholder="sku"
                                          className="h-[35px] border px-2"
                                        />
                                      </div>
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Packsize
                                        </label>
                                        <Field
                                          name={`variants[${index}].packSize`}
                                          type="number"
                                          placeholder="packsize"
                                          className="h-[35px] border px-2"
                                        />
                                      </div>
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Margin
                                        </label>
                                        <Field
                                          name={`variants[${index}].margin`}
                                          type="number"
                                          placeholder="Margin"
                                          className="h-[35px] border px-2"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex gap-5">
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Price
                                        </label>
                                        <Field
                                          name={`variants[${index}].price`}
                                          type="number"
                                          placeholder="price"
                                          className="h-[35px] border px-2"
                                        />
                                      </div>
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Sale price
                                        </label>
                                        <Field
                                          name={`variants[${index}].salePrice`}
                                          type="number"
                                          placeholder="Sale price"
                                          className="h-[35px] border px-2"
                                        />
                                      </div>
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Stock Available
                                        </label>
                                        <Field
                                          as="select"
                                          name={`variants[${index}].isStockAvailable`}
                                          className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[155px]"
                                        >
                                          <option value={false}>No</option>
                                          <option value={true}>Yes</option>
                                        </Field>
                                      </div>
                                    </div>
                                    <div className="flex gap-5">
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Min Order Qty
                                        </label>
                                        <Field
                                          name={`variants[${index}].minOrderQuantity`}
                                          type="number"
                                          placeholder="Minimum Order"
                                          className="h-[35px] border px-2"
                                        />
                                      </div>
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Max order Qty
                                        </label>
                                        <Field
                                          name={`variants[${index}].maxOrderQuantity`}
                                          type="number"
                                          placeholder="Maximum order"
                                          className="h-[35px] border px-2"
                                        />
                                      </div>

                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Currency
                                        </label>
                                        <Field
                                          as="select"
                                          name={`variants[${index}].currency`}
                                          className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[155px]"
                                        >
                                          <option value="₹">₹</option>
                                          <option value="Euro">Euro</option>
                                        </Field>
                                      </div>
                                    </div>
                                    <div className="flex gap-4">
                                      <div className="flex flex-col gap-2 w-[120px]">
                                        <label className="px-3 font-semibold opacity-65">
                                          Weight Unit
                                        </label>
                                        <Field
                                          as="select"
                                          name={`variants[${index}].weightUnit`}
                                          className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                                        >
                                          <option value="kg">kg</option>
                                          <option value="gm">gm</option>
                                          <option value="mg">mg</option>
                                        </Field>
                                      </div>
                                      <div className="flex flex-col gap-2 w-[120px]">
                                        <label className="px-3 font-semibold opacity-65">
                                          Width Unit
                                        </label>
                                        <Field
                                          as="select"
                                          name={`variants[${index}].widthUnit`}
                                          className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                                        >
                                          <option value="m">m</option>
                                          <option value="cm">cm</option>
                                          <option value="mm">mm</option>
                                        </Field>
                                      </div>
                                      <div className="flex flex-col gap-2 w-[120px]">
                                        <label className="px-3 font-semibold opacity-65">
                                          Length Unit
                                        </label>
                                        <Field
                                          as="select"
                                          name={`variants[${index}].lengthUnit`}
                                          className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                                        >
                                          <option value="m">m</option>
                                          <option value="cm">cm</option>
                                          <option value="mm">mm</option>
                                        </Field>
                                      </div>
                                      <div className="flex flex-col gap-2 w-[120px]">
                                        <label className="px-3 font-semibold opacity-65">
                                          Height Unit
                                        </label>
                                        <Field
                                          as="select"
                                          name={`variants[${index}].heightUnit`}
                                          className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                                        >
                                          <option value="m">m</option>
                                          <option value="cm">cm</option>
                                          <option value="mm">mm</option>
                                        </Field>
                                      </div>
                                    </div>
                                    <div className="flex gap-4">
                                      <div className="flex flex-col w-[120px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Weight
                                        </label>
                                        <Field
                                          name={`variants[${index}].weight`}
                                          type="number"
                                          placeholder="Weight"
                                          className="h-[35px] border px-2 w-[120px]"
                                        />
                                      </div>
                                      <div className="flex flex-col w-[120px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Width
                                        </label>
                                        <Field
                                          name={`variants[${index}].width`}
                                          type="number"
                                          placeholder="Width"
                                          className="h-[35px] border px-2 w-[120px]"
                                        />
                                      </div>
                                      <div className="flex flex-col w-[120px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Length
                                        </label>
                                        <Field
                                          name={`variants[${index}].length`}
                                          type="number"
                                          placeholder="Length"
                                          className="h-[35px] border px-2 w-[120px]"
                                        />
                                      </div>
                                      <div className="flex flex-col w-[120px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Height
                                        </label>
                                        <Field
                                          name={`variants[${index}].height`}
                                          type="number"
                                          placeholder="Height"
                                          className="h-[35px] border px-2 w-[120px]"
                                        />
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded self-end"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() =>
                                    push({
                                      sku: "",
                                      packSize: "",
                                      price: "",
                                      salePrice: "",
                                      margin: "",
                                      minOrderQuantity: "",
                                      maxOrderQuantity: "",
                                      isStockAvailable: false,
                                      currency: "₹",
                                      weightUnit: "gm",
                                      widthUnit: "cm",
                                      lengthUnit: "cm",
                                      heightUnit: "cm",
                                      weight: "",
                                      length: "",
                                      height: "",
                                      width: "",
                                    })
                                  }
                                  className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                  Add another variant
                                </button>
                              </>
                            )}
                          </FieldArray>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="right w-[25%] mt-5 p-3">
                  {/* product categories */}
                  <div className="product-categories border rounded-xl p-3 fixed-width-card">
                    <div className="flex justify-between items-center">
                      <label className="font-bold">All Categories</label>
                      <button
                        onClick={toggleOpen}
                        className="focus:outline-none"
                      >
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
                                                &nbsp; &nbsp; &nbsp;{" "}
                                                {child3.name}
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
                                                      &nbsp; &nbsp; &nbsp;
                                                      &nbsp; {child4.name}
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

                  {/* product tags */}
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

                  {/* generics mapping */}
                  <div className="mt-5 product-tags border rounded-xl p-3 fixed-width-card">
                    <div className="flex justify-between items-center px-3">
                      <label className="font-bold">Generics Id</label>
                      <button
                        onClick={toggleGenericsOpen}
                        className="focus:outline-none"
                      >
                        {genericsopen ? (
                          <FaChevronUp className="text-blue-500" />
                        ) : (
                          <FaChevronDown className="text-blue-500" />
                        )}
                      </button>
                    </div>

                    <div
                      className={`generic-map mt-3 ${
                        genericsopen
                          ? "h-[250px] overflow-y-auto"
                          : "h-0 overflow-hidden"
                      } transition-all duration-300`}
                    >
                      <div>
                        {genericsMap?.map((generic) => (
                          <div key={generic?.id} className="flex gap-2">
                            <input
                              type="radio"
                              name="genericID"
                              value={generic?._id}
                              onChange={(e) =>
                                handleGenericsChange(setFieldValue, e)
                              }
                              checked={values.genericID === generic._id}
                            />
                            <p>{generic?.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* booleans here */}

                  {/* isReturnable */}
                  {/* <div className="relative inline-block w-64 mt-5">
                    <label className="font-bold">Do you want to return</label>
                    <select
                      value={retunSelectedOption}
                      onChange={(e) => setReturnSelectedOption(e.target.value)}
                      className="block w-full appearance-none mt-2 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-[55px] right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.293 7.293l1.414 1.414L10 5.414l3.293 3.293 1.414-1.414L10 2.586l-4.707 4.707zM4 10l1.293-1.293 1.414 1.414L10 6.414l3.293 3.293 1.414-1.414L16 10H4z" />
                      </svg>
                    </div>
                  </div> */}

                  {/* prescription required */}
                  {/* <div className="relative inline-block w-64 mt-5">
                    <label className="font-bold px-3">
                      Do you want to return
                    </label>
                    <select
                      value={retunSelectedOption}
                      onChange={(e) => setReturnSelectedOption(e.target.value)}
                      className="block w-full appearance-none mt-2 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-[55px] right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.293 7.293l1.414 1.414L10 5.414l3.293 3.293 1.414-1.414L10 2.586l-4.707 4.707zM4 10l1.293-1.293 1.414 1.414L10 6.414l3.293 3.293 1.414-1.414L16 10H4z" />
                      </svg>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="flex justify-center mt-5 mb-5">
                <button
                  type="submit"
                  className="bg-[#13a3bc] hover:bg-[#13b6d5] py-1 text-white font-bold px-4 rounded-md"
                >
                  Submit Total Data
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
