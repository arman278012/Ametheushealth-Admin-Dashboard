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
import toast from "react-hot-toast";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

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
  countryOrigin: "",
  metaTitle: "",
  metaDescription: "",
  metaTags: "",
  manufacturerID: "",
  manufacturer: "",
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
  const [externalLink, setExternalLink] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [manufacturerNamesId, setManufacturerNamesId] = useState("");
  const [manuIdOpen, setManuIdOpen] = useState(false);
  const [genericQuery, setGenericQuery] = useState("");
  const [hierarchyQuery, setHierarchyQuery] = useState("");
  const [manufacturerQuery, setManufacturerQuery] = useState("");
  const [sku, setSku] = useState("");

  const toggleManuId = () => {
    setManuIdOpen(!manuIdOpen);
  };

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

  //-----------------------productCategoriesData-----------------------------------------------------------

  const productCategoriesData = async (hierarchySearch) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/category/hierarchy-names?search=${hierarchySearch}`,
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
    if (!hierarchyQuery) {
      productCategoriesData("");
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      productCategoriesData(hierarchyQuery);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [hierarchyQuery]);

  //-----------------------productCategoriesData-----------------------------------------------------------

  //-------------genericsData----------------------------------------

  const genericsData = async (search = "") => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/generic/names?search=${search}`,
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
    // Fetch all data initially or when component mounts
    if (!genericQuery) {
      genericsData(""); // Pass an empty string to fetch all categories initially
      return;
    }

    // Add debounce logic for search query
    const delayDebounceFn = setTimeout(() => {
      genericsData(genericQuery);
    }, 200); // Adjust the debounce delay as needed

    // Cleanup function to clear the timeout on component unmount or when hierarchyQuery changes
    return () => clearTimeout(delayDebounceFn);
  }, [genericQuery]);

  //-------------genericsData----------------------------------------

  //-------------getManufacturerNames----------------------------------------
  const getManufacturerNames = async (search) => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/manufacturer/names?search=${search}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log("getManufacturerNames", response.data.data);
      setManufacturerNamesId(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch all data initially or when component mounts
    if (!manufacturerQuery) {
      getManufacturerNames(""); // Pass an empty string to fetch all categories initially
      return;
    }

    // Add debounce logic for search query
    const delayDebounceFn = setTimeout(() => {
      getManufacturerNames(manufacturerQuery);
    }, 200); // Adjust the debounce delay as needed

    // Cleanup function to clear the timeout on component unmount or when hierarchyQuery changes
    return () => clearTimeout(delayDebounceFn);
  }, [manufacturerQuery]);
  //-------------getManufacturerNames----------------------------------------

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

  const handleManuIdChange = (setFieldValue, e) => {
    setFieldValue("manufacturerID", e.target.value);
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    setIsUrlValid(isValidUrl(externalLink));
  }, [externalLink]);

  const handleExChange = (e) => {
    const { value } = e.target;
    setExternalLink(value);
  };

  const navigate = useNavigate();

  //posting data to the backend
  const postProductsData = async (values, e) => {
    try {
      // e.preventDefault();
      const response = await axios.post(
        `https://api.assetorix.com:4100/ah/api/v1/product`,
        values,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Product Created Successfully...");
      if (response.status === 201) {
        navigate(`/edit-products/${response.data.product._id}`);
      }
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle checkbox change and SKU mapping
  const handleCheckboxChange = async (setFieldValue, event, values, index) => {
    const { name, value, checked } = event.target;

    // Update the formik state with the checkbox change
    if (checked) {
      setFieldValue(name, [...values[name], value]);
    } else {
      setFieldValue(
        name,
        values[name].filter((item) => item !== value)
      );
    }

    // Create the payload object with the necessary data
    const payload = {
      categoryID: value,
      isChecked: checked,
    };

    // Call the API with the populated payload
    try {
      const response = await axios.post(
        `https://api.assetorix.com:4100/ah/api/v1/product/sku`,
        payload,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      const generatedSku = response.data.data.sku;

      // Update the corresponding variant's SKU
      setFieldValue(`variants[${index}].sku`, generatedSku);
      console.log("API response:", generatedSku);
    } catch (err) {
      console.log("API error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="main-div-parent p-5 bg-[#f0f0f1]">
      <p className="text-[16px] font-bold">Add Products</p>
      <div className="flex flex-wrap gap-10 border border-gray-300 mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            postProductsData(values);
            console.log("Form values:", values);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
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
                        <button
                          type="button"
                          onClick={() => setActiveSection("name")}
                        >
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
                          type="button"
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
                          type="button"
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
                          type="button"
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
                          activeSection === "additionalInformation"
                            ? "bg-blue-500 text-white flex gap-2 py-1 px-2 text-[12px] font-bold"
                            : " flex gap-2 text-sm"
                        }`}
                      >
                        <button
                          type="button"
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
                          type="button"
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
                          type="button"
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
                          type="button"
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
                          type="button"
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

                          <div className="flex gap-5">
                            <div className="flex flex-col w-1/2">
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

                            <div className="flex flex-col w-1/2">
                              <label className="font-semibold px-2 opacity-65">
                                External Link
                              </label>
                              <input
                                type="text"
                                placeholder="External Link"
                                className={`h-[35px] border px-2 ${
                                  !isUrlValid ? "border-red-500" : ""
                                }`}
                                onChange={(e) => {
                                  handleExChange(e);
                                  handleChange(e);
                                }}
                                value={externalLink}
                                name="externalLink"
                              />
                              {/* {!isUrlValid && (
                                <div className="text-red-500">Invalid URL</div>
                              )} */}
                            </div>
                          </div>

                          <div className="flex gap-5">
                            <div className="flex flex-col w-1/2">
                              <label className="font-semibold px-2 opacity-65">
                                Country Origin
                              </label>
                              <input
                                type="text"
                                placeholder="Country Origin"
                                className="h-[35px] border px-2 focus:outline-none"
                                onChange={handleChange}
                                value={values.countryOrigin}
                                name="countryOrigin"
                              />
                            </div>

                            <div className="flex flex-col w-1/2">
                              <label className="font-semibold px-2 opacity-65">
                                Position
                              </label>
                              <input
                                type="number"
                                placeholder="Position"
                                className="h-[35px] border px-2 focus:outline-none"
                                onChange={handleChange}
                                value={values.position}
                                name="position"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <label className="font-semibold px-2 opacity-65">
                              Manufacturer Name
                            </label>
                            <input
                              type="text"
                              placeholder="Manufacturer Name"
                              className="h-[35px] border px-2"
                              onChange={handleChange}
                              value={values.manufacturer}
                              name="manufacturer"
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
                                  type="button"
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
                                          value={
                                            values.variants[index]?.sku || ""
                                          }
                                          onChange={(e) =>
                                            setFieldValue(
                                              `variants[${index}].sku`,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="flex flex-col w-[165px]">
                                        <label className="font-semibold px-2 opacity-65">
                                          Packsize
                                        </label>
                                        <Field
                                          name={`variants[${index}].packSize`}
                                          type="text"
                                          placeholder="packsize"
                                          className="h-[35px] border px-2 focus:outline-none"
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
                                          className="h-[35px] border px-2 focus:outline-none"
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
                                          className="h-[35px] border px-2 focus:outline-none"
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
                                          className="h-[35px] border px-2 focus:outline-none "
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
                                          <option value={true}>Yes</option>
                                          <option value={false}>No</option>
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
                                          className="h-[35px] border px-2 focus:outline-none"
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
                                          className="h-[35px] border px-2 focus:outline-none"
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
                                          className="h-[35px] border px-2 w-[120px] focus:outline-none"
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
                                          className="h-[35px] border px-2 w-[120px] focus:outline-none"
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
                                          className="h-[35px] border px-2 w-[120px] focus:outline-none"
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
                                          className="h-[35px] border px-2 w-[120px] focus:outline-none"
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
                                      price: 0,
                                      salePrice: 0,
                                      margin: "",
                                      minOrderQuantity: "1",
                                      maxOrderQuantity: "100",
                                      isStockAvailable: true,
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
                        type="button"
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
                      {/* <div>
                        <input
                          type="text"
                          value={hierarchyQuery}
                          className="w-full px-2 py-1"
                          placeholder="Search..."
                          onChange={(e) => setHierarchyQuery(e.target.value)}
                        />
                      </div> */}
                      {/* // JSX rendering of the SKU input and hierarchical
                      checkboxes */}
                      {hierarchyData?.map((item, index) => (
                        <div className="border-2 p-5" key={item._id}>
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={item._id}
                              name="categoryID"
                              value={item._id}
                              className="mr-2"
                              onChange={(e) =>
                                handleCheckboxChange(
                                  setFieldValue,
                                  e,
                                  values,
                                  index
                                )
                              }
                              checked={values.categoryID.includes(item._id)}
                            />
                            <label htmlFor={item._id} className="font-bold">
                              {item.name}
                            </label>
                          </div>
                          {/* Recursive mapping for children */}
                          {item.children &&
                            item.children.map((child) => (
                              <div key={child._id}>
                                <div className="flex items-center mb-2 ml-4">
                                  <input
                                    type="checkbox"
                                    id={child._id}
                                    name="categoryID"
                                    value={child._id}
                                    className="mr-2"
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        setFieldValue,
                                        e,
                                        values,
                                        index
                                      )
                                    }
                                    checked={values.categoryID.includes(
                                      child._id
                                    )}
                                  />
                                  <label htmlFor={child._id}>
                                    &nbsp; {child.name}
                                  </label>
                                </div>
                                {/* Further recursive mapping for deeper children */}
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
                          type="button"
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
                          <div className="flex justify-around flex-col">
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

                  {/* generics mapping */}
                  <div className="mt-5 product-tags border rounded-xl p-3 fixed-width-card">
                    <div className="flex justify-between items-center px-3">
                      <label className="font-bold">Generics Id</label>
                      <button
                        type="button"
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
                        <input
                          type="text"
                          className="w-full px-2 py-1"
                          placeholder="Search..."
                          value={genericQuery}
                          onChange={(e) => setGenericQuery(e.target.value)}
                        />
                      </div>
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

                  {/* manufacturers Mapping */}
                  <div className="mt-5 product-tags border rounded-xl p-3 fixed-width-card">
                    <div className="flex justify-between items-center px-3">
                      <label className="font-bold">Manufacturer Id</label>
                      <button
                        type="button"
                        onClick={toggleManuId}
                        className="focus:outline-none"
                      >
                        {manuIdOpen ? (
                          <FaChevronUp className="text-blue-500" />
                        ) : (
                          <FaChevronDown className="text-blue-500" />
                        )}
                      </button>
                    </div>

                    <div
                      className={`generic-map mt-3 ${
                        manuIdOpen
                          ? "h-[300px] overflow-y-auto"
                          : "h-0 overflow-hidden"
                      } transition-all duration-300`}
                    >
                      <div>
                        <div>
                          <input
                            type="text"
                            className="w-full px-2 py-1"
                            placeholder="Search..."
                            value={manufacturerQuery}
                            onChange={(e) =>
                              setManufacturerQuery(e.target.value)
                            }
                          />
                        </div>
                        {manufacturerNamesId?.data?.map((manufacturer) => (
                          <div key={manufacturer?.id} className="flex gap-2">
                            <input
                              type="radio"
                              name="manufacturerID"
                              value={manufacturer?._id}
                              onChange={(e) =>
                                handleManuIdChange(setFieldValue, e)
                              }
                              checked={
                                values.manufacturerID === manufacturer._id
                              }
                            />
                            <p>{manufacturer?.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
