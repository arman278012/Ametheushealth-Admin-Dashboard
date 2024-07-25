import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronUp, FaChevronDown, FaTrash } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdMore } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { LiaQuestionSolid } from "react-icons/lia";
import { MdAssignmentAdd } from "react-icons/md";
import { DiHtml53dEffects } from "react-icons/di";
import { PiSelectionSlashFill } from "react-icons/pi";
import { Field } from "formik";
import JoditEditor from "jodit-react";
import { RxCross2 } from "react-icons/rx";

const EditProducts = () => {
  const { id } = useParams();

  const [activeSection, setActiveSection] = useState("name");
  const [externalLink, setExternalLink] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [productTags, setProductTags] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [tags, setTags] = useState([]);
  const [storeMetaTag, setStoreMetaTag] = useState([]);
  const [genericsOpen, setGenericsOpen] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [genericsMap, setGenericMap] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [variantsToDelete, setVariantsToDelete] = useState([]);

  const [productValues, setProductValues] = useState({
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
    tags: [],
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
    variants: [
      {
        sku: "",
        packSize: "",
        price: "",
        salePrice: "",
        margin: "",
        minOrderQuantity: "1",
        maxOrderQuantity: "100",
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
      },
    ],
  });

  const handleMetaTagChange = (e) => {
    const { name, value } = e.target;
    setProductValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAddMetaTag = (e) => {
    e.preventDefault();
    // Add your logic to handle adding the meta tag
    // For example, you can update a list of meta tags in the state
    console.log("Meta Tag Added: ", productValues.metaTags);
    // Clear the input field after adding the tag
    setProductValues((prevValues) => ({
      ...prevValues,
      metaTags: "",
    }));
  };

  useEffect(() => {
    setTags(productValues.tags);
  }, [productValues.tags]);

  const handleTagInputChange = (e) => {
    setTagsInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagsInput) {
      setTags([...tags, tagsInput]);
      setTagsInput("");
    }
  };

  const handleEditTag = (index, newTag) => {
    const updatedTags = tags.map((tag, i) => (i === index ? newTag : tag));
    setTags(updatedTags);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductValues({ ...productValues, [name]: value });
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    const [field, index, subField] = name.split(/[\[\].]+/).filter(Boolean);
    const updatedVariants = productValues.variants.map((variant, i) =>
      i === Number(index) ? { ...variant, [subField]: value } : variant
    );

    setProductValues({
      ...productValues,
      [field]: updatedVariants,
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setProductValues({ ...productValues, [name]: value });
  };

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleProductOpen = () => setProductTags(!productTags);
  const toggleOpenImageUpload = () => setIsImageOpen(!isImageOpen);
  const toggleGenericsOpen = () => setGenericsOpen(!genericsOpen);
  console.log(id);

  const getDataForEdit = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/product/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      const productData = response.data.data;
      console.log("productData", productData);
      setProductValues({
        ...productData,
        tags: productData.tags || [],
        variants: productData.variants.map((variant) => ({
          sku: variant.sku || "",
          packSize: variant.packSize || "",
          price: variant.price || "",
          salePrice: variant.salePrice || "",
          margin: variant.margin || "",
          minOrderQuantity: variant.minOrderQuantity || "",
          maxOrderQuantity: variant.maxOrderQuantity || "",
          isStockAvailable: variant.isStockAvailable || true,
          currency: variant.currency || "",
          weightUnit: variant.weightUnit || "",
          widthUnit: variant.widthUnit || "",
          lengthUnit: variant.lengthUnit || "",
          heightUnit: variant.heightUnit || "",
          weight: variant.weight || "",
          length: variant.length || "",
          height: variant.height || "",
          width: variant.width || "",
        })),
      });
      setTags(productData.tags || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataForEdit();
  }, [id]);

  const getHierarchy = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/category/hierarchy-names`,
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
    getHierarchy();
    genericsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductValues({
      ...productValues,
      [name]: value,
    });
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

  const editProductCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://api.assetorix.com:4100/ah/api/v1/product/${id}`,
        productValues,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  //Add image to a product
  const addImageToProduct = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    try {
      const response = await axios.post(
        `https://api.assetorix.com:4100/ah/api/v1/product/${id}/images`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      getDataForEdit();
    }
  };

  //delete single image
  const deleteSingleImage = async (imgId) => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com:4100/ah/api/v1/product/${id}/single-image/${imgId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //for deleting the variants

  return (
    <div className="main-div-parent p-5 bg-[#f0f0f1]">
      <p className="font-bold">Edit products</p>
      <div className="w-full">
        <form onSubmit={editProductCategory}>
          <div className="w-[100%] flex gap-5">
            <div className="w-[70%] flex left">
              <div className="w-[30%]">
                <div className="flex flex-col gap-3 p-3">
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
                      onClick={() => setActiveSection("additionalInformation")}
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
              </div>
              <div className="flex flex-col gap-5 left border w-[70%] mt-5">
                {activeSection === "name" && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-full">
                      <label className="font-semibold px-2 opacity-65 text-[12px]">
                        Product Name
                      </label>
                      <input
                        type="text"
                        placeholder="Product name"
                        className="h-[35px] border px-2"
                        onChange={handleChange}
                        name="title"
                        value={productValues.title}
                      />
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="flex flex-col w-full">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Generic Name
                        </label>
                        <input
                          type="text"
                          placeholder="Generic name"
                          name="generic"
                          value={productValues.generic}
                          className="h-[35px] border px-2"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Treatment
                        </label>
                        <input
                          type="text"
                          placeholder="Treatment"
                          className="h-[35px] border px-2"
                          onChange={handleChange}
                          value={productValues.treatment}
                          name="treatment"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold px-2 opacity-65 text-[12px]">
                        Purchase Note
                      </label>
                      <input
                        type="text"
                        placeholder="Purchase Note"
                        className="h-[35px] border px-2"
                        onChange={handleChange}
                        value={productValues.purchaseNote}
                        name="purchaseNote"
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <label className="font-semibold px-2 opacity-65 text-[12px]">
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
                        value={productValues.externalLink}
                        name="externalLink"
                      />
                      {!isUrlValid && (
                        <div className="text-red-500">Invalid URL</div>
                      )}
                    </div>

                    <div className="flex flex-col w-full">
                      <label className="font-semibold px-2 opacity-65 text-[12px]">
                        Position
                      </label>
                      <input
                        type="number"
                        placeholder="Position"
                        className="h-[35px] border px-2 focus:outline-none"
                        onChange={handleChange}
                        value={productValues.position}
                        name="position"
                      />
                    </div>
                  </div>
                )}

                {activeSection === "description" && (
                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Description</label>
                    <div>
                      <JoditEditor
                        value={productValues.description}
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

                      {/* {errors.description && touched.description && (
                        <div className="text-red-500">{errors.description}</div>
                      )} */}
                    </div>
                  </div>
                )}

                {activeSection === "shortDescription" && (
                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Short Description</label>
                    <div>
                      <JoditEditor
                        value={productValues.shortDescription}
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

                      {/* {errors.shortDescription && touched.shortDescription && (
                        <div className="text-red-500">
                          {errors.shortDescription}
                        </div>
                      )} */}
                    </div>
                  </div>
                )}

                {activeSection === "moreInformation" && (
                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">More Information</label>
                    <div>
                      <JoditEditor
                        value={productValues.moreInformation}
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

                      {/* {errors.moreInformation && touched.moreInformation && (
                        <div className="text-red-500">
                          {errors.moreInformation}
                        </div>
                      )} */}
                    </div>
                  </div>
                )}

                {activeSection === "faq" && (
                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Faq</label>
                    <div>
                      (
                      <JoditEditor
                        value={productValues.faq}
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
                      {/* {errors.faq && touched.faq && (
                        <div className="text-red-500">{errors.faq}</div>
                      )} */}
                    </div>
                  </div>
                )}

                {activeSection === "additionalInformation" && (
                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">
                      Additional Information
                    </label>
                    <div>
                      <JoditEditor
                        className="h-[400px]"
                        value={productValues.additionalInformation}
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

                      {/* {errors.additionalInformation &&
                        touched.additionalInformation && (
                          <div className="text-red-500">
                            {errors.additionalInformation}
                          </div>
                        )} */}
                    </div>
                  </div>
                )}

                {activeSection === "sideEffects" && (
                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Side Effects</label>
                    <div>
                      <JoditEditor
                        value={productValues.sideEffects}
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

                      {/* {errors.sideEffects && touched.sideEffects && (
                        <div className="text-red-500">{errors.sideEffects}</div>
                      )} */}
                    </div>
                  </div>
                )}

                {activeSection === "yes-no" && (
                  <div className="flex flex-col gap-10 justify-center items-center">
                    <div className="flex gap-10">
                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">IsReturnable?</label>
                        <div className="relative inline-block text-left">
                          <select
                            name="isReturnable"
                            value={productValues.isReturnable}
                            onChange={(event) => {
                              const value = event.target.value === "true";
                              setProductValues((prevValues) => ({
                                ...prevValues,
                                isReturnable: value,
                              }));
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">
                          IsPrescriptionRequired?
                        </label>
                        <div className="relative inline-block text-left">
                          <select
                            name="isPrescriptionRequired"
                            value={productValues.isPrescriptionRequired}
                            onChange={(event) => {
                              const value = event.target.value === "true";
                              setProductValues((prevValues) => ({
                                ...prevValues,
                                isPrescriptionRequired: value,
                              }));
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-10">
                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">IsVisible?</label>
                        <div className="relative inline-block text-left">
                          <select
                            name="isVisible"
                            value={productValues.isVisible}
                            onChange={(event) => {
                              const value = event.target.value === "true";
                              setProductValues((prevValues) => ({
                                ...prevValues,
                                isVisible: value,
                              }));
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">IsFeatured?</label>
                        <div className="relative inline-block text-left">
                          <select
                            name="isFeatured"
                            value={productValues.isFeatured}
                            onChange={(event) => {
                              const value = event.target.value === "true";
                              setProductValues((prevValues) => ({
                                ...prevValues,
                                isFeatured: value,
                              }));
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start gap-2">
                      <label className="px-3 font-bold">IsDiscontinued?</label>
                      <div className="relative inline-block text-left">
                        <select
                          name="isDiscontinued"
                          value={productValues.isDiscontinued}
                          onChange={(event) => {
                            const value = event.target.value === "true";
                            setProductValues((prevValues) => ({
                              ...prevValues,
                              isDiscontinued: value,
                            }));
                          }}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "meta" && (
                  <>
                    <div className="flex flex-col gap-5 justify-center w-[500px]">
                      <div className="flex flex-col w-full p-5">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Meta Title
                        </label>
                        <input
                          type="text"
                          placeholder="Title"
                          className="h-[35px] border px-2"
                          onChange={handleChange}
                          name="metaTitle"
                          value={productValues.metaTitle}
                        />
                      </div>

                      <div className="flex flex-col w-full p-5">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Meta Description
                        </label>
                        <textarea
                          type="text"
                          placeholder="Description"
                          className="border px-2 focus:outline-none"
                          onChange={handleChange}
                          name="metaDescription"
                          value={productValues.metaDescription}
                        />
                      </div>

                      <div className="flex flex-col w-full p-5">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Meta Tags
                        </label>
                        <div className="flex gap-3">
                          <div>
                            <textarea
                              type="text"
                              name="metaTags"
                              placeholder="Enter tags"
                              className=" border px-2 w-[460px] focus:outline-none"
                              value={productValues.metaTags}
                              onChange={handleMetaTagChange}
                            />
                          </div>
                          {/* <button
                            onClick={handleAddMetaTag}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Add Tags
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeSection === "variants" && (
                  <div className="w-[500px] flex flex-col p-5">
                    {productValues.variants.map((variant, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col gap-5 mb-5">
                          <div className="flex gap-4 justify-around">
                            <div className="flex flex-col w-[165px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                SKU
                              </label>
                              <input
                                value={variant.sku}
                                name={`variants[${index}].sku`}
                                onChange={handleVariantChange}
                                type="text"
                                placeholder="sku"
                                className="h-[35px] border px-2"
                              />
                            </div>
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Packsize
                              </label>
                              <input
                                value={variant.packSize}
                                name={`variants[${index}].packsize`}
                                type="number"
                                placeholder="packsize"
                                className="h-[35px] border px-2 focus:outline-none"
                                onChange={handleVariantChange}
                              />
                            </div>
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Margin
                              </label>
                              <input
                                name={`variants[${index}].margin`}
                                value={variant.margin}
                                type="number"
                                placeholder="Margin"
                                className="h-[35px] border px-2 focus:outline-none"
                                onChange={handleVariantChange}
                              />
                            </div>
                          </div>
                          <div className="flex gap-5 justify-around">
                            <div className="flex flex-col w-[105px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Price
                              </label>
                              <input
                                name={`variants[${index}].price`}
                                value={variant.price}
                                type="number"
                                placeholder="price"
                                className="h-[35px] border px-2 focus:outline-none"
                                onChange={handleVariantChange}
                              />
                            </div>
                            <div className="flex flex-col w-[105px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Sale price
                              </label>
                              <input
                                name={`variants[${index}].salePrice`}
                                value={variant.salePrice}
                                type="number"
                                placeholder="Sale price"
                                className="h-[35px] border px-2 focus:outline-none"
                                onChange={handleVariantChange}
                              />
                            </div>
                            <div className="flex flex-col w-[165px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Stock Available
                              </label>
                              <select
                                value={variant.isStockAvailable}
                                onChange={handleVariantChange}
                                name={`variants[${index}].isStockAvailable`}
                                className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[155px]"
                              >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-5 justify-around">
                            <div className="flex flex-col w-[125px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Min Order Qty
                              </label>
                              <input
                                name={`variants[${index}].minOrderQuantity`}
                                value={variant.minOrderQuantity}
                                onChange={handleVariantChange}
                                type="number"
                                placeholder="Minimum Order"
                                className="h-[35px] border px-2 focus:outline-none"
                              />
                            </div>
                            <div className="flex flex-col w-[125px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Max order Qty
                              </label>
                              <input
                                name={`variants[${index}].maxOrderQuantity`}
                                value={variant.maxOrderQuantity}
                                onChange={handleVariantChange}
                                type="number"
                                placeholder="Maximum order"
                                className="h-[35px] border px-2 focus:outline-none"
                              />
                            </div>
                            <div className="flex flex-col w-[125px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Currency
                              </label>
                              <select
                                name={`variants[${index}].currency`}
                                value={variant.currency}
                                onChange={handleVariantChange}
                                className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                              >
                                <option value="₹">₹</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-evenly">
                            <div className="flex flex-col gap-2 w-[100px]">
                              <label className="px-3 font-semibold opacity-65 text-[12px] ">
                                Weight Unit
                              </label>
                              <select
                                name={`variants[${index}].weightUnit`}
                                value={variant.weightUnit}
                                onChange={handleVariantChange}
                                className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[100px]"
                              >
                                <option value="kg">kg</option>
                                <option value="gm">gm</option>
                                <option value="mg">mg</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-2 w-[100px]">
                              <label className="px-3 font-semibold opacity-65 text-[12px] ">
                                Width Unit
                              </label>
                              <select
                                onChange={handleVariantChange}
                                name={`variants[${index}].widthUnit`}
                                value={variant.widthUnit}
                                className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[100px]"
                              >
                                <option value="m">m</option>
                                <option value="cm">cm</option>
                                <option value="mm">mm</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-2 w-[100px]">
                              <label className="px-3 font-semibold opacity-65 text-[12px]">
                                Length Unit
                              </label>
                              <select
                                name={`variants[${index}].lengthUnit`}
                                onChange={handleVariantChange}
                                value={variant.lengthUnit}
                                className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[100px]"
                              >
                                <option value="m">m</option>
                                <option value="cm">cm</option>
                                <option value="mm">mm</option>
                              </select>
                            </div>
                            <div className="flex flex-col gap-2 w-[100px]">
                              <label className="px-3 font-semibold opacity-65 text-[12px]">
                                Height Unit
                              </label>
                              <select
                                name={`variants[${index}].heightUnit`}
                                onChange={handleVariantChange}
                                value={variant.heightUnit}
                                className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[100px]"
                              >
                                <option value="m">m</option>
                                <option value="cm">cm</option>
                                <option value="mm">mm</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-around">
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Weight
                              </label>
                              <input
                                value={variant.weight}
                                onChange={handleVariantChange}
                                name={`variants[${index}].weight`}
                                type="number"
                                placeholder="Weight"
                                className="h-[35px] border px-2 w-[100px] focus:outline-none"
                              />
                            </div>
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Width
                              </label>
                              <input
                                onChange={handleVariantChange}
                                name={`variants[${index}].width`}
                                value={variant.width}
                                type="number"
                                placeholder="Width"
                                className="h-[35px] border px-2 w-[100px] focus:outline-none"
                              />
                            </div>
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Length
                              </label>
                              <input
                                onChange={handleVariantChange}
                                name={`variants[${index}].length`}
                                value={variant.length}
                                type="number"
                                placeholder="Length"
                                className="h-[35px] border px-2 w-[100px] focus:outline-none"
                              />
                            </div>
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Height
                              </label>
                              <input
                                onChange={handleVariantChange}
                                value={variant.height}
                                name={`variants[${index}].height`}
                                type="number"
                                placeholder="Height"
                                className="h-[35px] border px-2 w-[100px] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center items-center mb-5">
                          <button
                            type="button"
                            // onClick={() => handleRemove(index)}
                            className="mt-2 bg-red-500 text-white px-4 py-1 rounded self-end"
                          >
                            Remove variant
                          </button>
                        </div>

                        <div className="bg-black h-[2px] w-full mb-5"></div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="right w-[30%] mt-5 p-3">
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
                    isOpen ? "h-[300px] overflow-y-auto" : "h-0 overflow-hidden"
                  } transition-all duration-300`}
                >
                  {hierarchyData?.map((item) => (
                    <div className="border-2 p-2" key={item._id}>
                      <div className="flex items-center mb-2">
                        <input
                          type="radio"
                          id={item._id}
                          name="categoryID"
                          value={item._id}
                          className="mr-2"
                          onChange={handleRadioChange}
                          checked={productValues.categoryID === item._id}
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
                                onChange={handleRadioChange}
                                checked={productValues.categoryID === child._id}
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
                                      onChange={handleRadioChange}
                                      checked={
                                        productValues.categoryID === child2._id
                                      }
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
                                            onChange={handleRadioChange}
                                            checked={
                                              productValues.categoryID ===
                                              child3._id
                                            }
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
                                                  onChange={handleRadioChange}
                                                  checked={
                                                    productValues.categoryID ===
                                                    child4._id
                                                  }
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
                      <div className="flex justify-around">
                        <input
                          type="text"
                          placeholder="Enter tags"
                          className="h-[35px] border px-2"
                          onChange={handleTagInputChange}
                          value={tagsInput}
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    {tags.length > 0 && (
                      <div className="mt-3">
                        {/* {tags?.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center px-2 py-1"
                          >
                            <input
                              type="text"
                              value={tag}
                              onChange={(e) =>
                                handleEditTag(index, e.target.value)
                              }
                              className="border p-1 flex-grow"
                            />
                          </div>
                        ))} */}
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
                    type="button"
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
                    <input
                      type="file"
                      multiple
                      className="w-[225px]"
                      onChange={handleFileChange}
                    />
                    {previewImages.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {previewImages.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`preview-${index}`}
                              className="w-[100px] h-[100px] object-cover rounded-md"
                            />
                            <button
                              onClick={() => handleDeleteImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={addImageToProduct}
                      className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white py-1 px-2 rounded-md"
                    >
                      Upload Images
                    </button>
                  </div>
                  <div className="grid grid-cols-3 border-[1px] border-gray-300 rounded-xl p-2 gap-2 ">
                    {productValues?.images?.map((image) => (
                      <>
                        <div className="flex gap-2">
                          <div className="border-[1px] border-gray-300 rounded-xl p-2 relative group">
                            <img src={image.url} alt="Image" />
                            <RxCross2
                              onClick={() => deleteSingleImage(image._id)}
                              className="text-red-800 absolute top-[-6px] left-[60px] cursor-pointer hidden group-hover:block"
                            />
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* generics mapping */}
              <div className="mt-5 product-tags border rounded-xl p-3 fixed-width-card">
                <div className="flex justify-between items-center px-3">
                  <label className="font-bold">All Generics</label>
                  <button
                    type="button"
                    onClick={toggleGenericsOpen}
                    className="focus:outline-none"
                  >
                    {genericsOpen ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>
                </div>

                <div
                  className={`generic-map mt-3 ${
                    genericsOpen
                      ? "h-[250px] overflow-y-auto"
                      : "h-0 overflow-hidden"
                  } transition-all duration-300`}
                >
                  <div>
                    {genericsMap?.map((generic) => (
                      <div key={generic?._id} className="flex gap-2">
                        <input
                          type="radio"
                          name="genericID"
                          value={generic?._id}
                          onChange={handleRadioChange}
                          checked={productValues.genericID === generic._id}
                        />
                        <p>{generic?.name}</p>
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
              Update Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
