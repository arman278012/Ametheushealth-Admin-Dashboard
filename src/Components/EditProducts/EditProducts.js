import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import toast from "react-hot-toast";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import './EditProducts.css'
const EditProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [activeSection, setActiveSection] = useState("name");
  const [compareWebsites, setCompareWebsites] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [productTags, setProductTags] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [tags, setTags] = useState([]);
  const [genericsOpen, setGenericsOpen] = useState(false);
  const [genericsMap, setGenericMap] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchGenericQuery, setSearchGenericQuery] = useState("");
  const [manuIdOpen, setManuIdOpen] = useState(false);
  const [manufacturerNamesId, setManufacturerNamesId] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [updateLoaderBtn, setUpdateLoaderBtn] = useState(false);
  const [searchManufacturerQuery, setSearchManufacturerQuery] = useState("");

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
    tags: "",
    genericID: "",
    isReturnable: false,
    isPrescriptionRequired: true,
    isVisible: true,
    isFeatured: false,
    isDiscontinued: false,
    purchaseNote: "",
    compareWebsites: "",
    position: "",
    countryOrigin: "",
    metaTitle: "",
    originCountry: "",
    metaDescription: "",
    metaTags: "",
    manufacturerID: "",
    manufacturer: "",
    productType: "",
    isPrescriptionMandatory: "",
    variants: [
      {
        _id: "",
        sku: "",
        packSize: "",
        price: 0,
        salePrice: 0,
        margin: 0,
        marginIndia: "",
        marginBangladesh: "",
        marginNepal: "",
        minOrderQuantity: 1,
        maxOrderQuantity: 100,
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

  const addVariant = () => {
    setProductValues((prevState) => ({
      ...prevState,
      variants: [
        ...prevState.variants,
        {
          sku: "",
          packSize: "",
          price: 0,
          salePrice: 0,
          margin: 0,
          marginIndia: "",
          marginBangladesh: "",
          marginNepal: "",
          minOrderQuantity: 1,
          maxOrderQuantity: 100,
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
    }));
  };

  const filterCategories = (items) => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderCategory = (item, level = 0) => {
    return (
      <div key={item._id} className={`ml-${level * 4}`}>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id={item._id}
            name="categoryID"
            value={item._id}
            className="mr-2"
            onChange={handleCheckboxChange}
            checked={selectedCategories.includes(item._id)}
          />
          <label htmlFor={item._id}>
            {`${"\u00A0".repeat(level * 2)}${item.name}`}
          </label>
        </div>
        {item.children &&
          item.children.map((child) => renderCategory(child, level + 1))}
      </div>
    );
  };

  // Your handleCheckboxChange function
  const handleCheckboxChange = async (event, categoryID) => {
    const { checked } = event.target;

    // Clone the existing categoryID array
    let updatedCategories = [...productValues.categoryID];

    // If checked, add the category ID, otherwise remove it
    if (checked) {
      updatedCategories.push(categoryID);
    } else {
      updatedCategories = updatedCategories.filter((id) => id !== categoryID);
    }

    // Update the productValues state with the new categoryID array
    setProductValues((prevState) => ({
      ...prevState,
      categoryID: updatedCategories,
    }));

    // Prepare payload for SKU generation
    const payload = {
      categoryID: categoryID,
      isChecked: checked,
    };

    // Call the API to generate SKU
    try {
      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/product/sku`,
        payload,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );

      // Extract generated SKU from response
      const generatedSku = response.data.data.sku;

      // Update the SKU in the first variant of the productValues
      setProductValues((prevState) => ({
        ...prevState,
        variants: [
          {
            ...prevState.variants[0], // Keep other variant data intact
            sku: generatedSku,
          },
        ],
      }));

      console.log("Generated SKU:", generatedSku);
    } catch (err) {
      console.error("Error generating SKU:", err);
    }
  };

  const handleRemoveVariant = (index) => {
    let prevValues = productValues;
    let data = fun(prevValues);
    function fun(prevValues) {
      const updatedVariants = prevValues.variants.filter((_, i) => i !== index);
      const newValues = {
        ...prevValues,
        variants: updatedVariants,
      };
      console.log(newValues); // Log the updated values
      return newValues;
    }
    setProductValues(data);
  };

  const handleMetaTagChange = (e) => {
    const { name, value } = e.target;
    setProductValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleProductTagChange = (event) => {
    const { name, value } = event.target;
    setProductValues({
      ...productValues,
      [name]: value,
    });
  };

  useEffect(() => {
    setTags(productValues.tags);
  }, [productValues.tags]);

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

  //getting the data for edit
  const getDataForEdit = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/product/admin/${id}`,
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
        tags: productData.tags || "",
        genericID: productData.genericID || "",
        variants: productData.variants.map((variant) => ({
          _id: variant._id || "",
          sku: variant.sku || "",
          marginIndia: variant.marginIndia || 0,
          marginBangladesh: variant.marginBangladesh || 0,
          marginNepal: variant.marginNepal || 0,
          packSize: variant.packSize || "",
          price: variant.price || 0,
          salePrice: variant.salePrice || 0,
          margin: variant.margin || 0,
          minOrderQuantity: variant.minOrderQuantity || 1,
          maxOrderQuantity: variant.maxOrderQuantity || 100,
          isStockAvailable: variant.isStockAvailable,
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
      setSelectedCategories(productData.categoryID || []);
      setTags(productData.tags || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataForEdit();
  }, [id]);

  const getHierarchy = async (query = "") => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/category/view?search=${query}`,
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

  useEffect(() => {
    getHierarchy();
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        getHierarchy(searchQuery);
      } else {
        getHierarchy("");
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchGenericsData = async (genericQuery = "") => {
    genericQuery = encodeURIComponent(genericQuery);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/generic/names?search=${genericQuery}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericMap(response.data);
      console.log("generics data", response.data);
    } catch (error) {
      console.log("Error fetching generics data:", error);
    }
  };

  useEffect(() => {
    // Fetch all data initially
    fetchGenericsData();

    // Add debounce logic for search query
    const delayDebounceFn = setTimeout(() => {
      fetchGenericsData(searchGenericQuery);
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchGenericQuery]);

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

  const handleExChange = (e) => {
    const { value } = e.target;
    setCompareWebsites(value);
  };

  const editProductCategory = async (e) => {
    e.preventDefault();
    setUpdateLoaderBtn(true);

    // Ensure that categoryID is updated with selectedCategories
    const updatedProductValues = {
      ...productValues, // Existing product values
      categoryID: productValues.categoryID, // Updated categoryID
    };

    try {
      const response = await axios.patch(
        `https://api.assetorix.com/ah/api/v1/product/${id}`,
        updatedProductValues, // Send the updated product data including categoryID
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );

      console.log("Response:", response.data);
      toast.success("Product updated successfully!");

      // Navigate back to product details page with search params (if any)
      const searchParams = location.state?.search || "";
      navigate(`/product-details?${searchParams}`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    } finally {
      setUpdateLoaderBtn(false);
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create previews for the selected files
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);

    // Immediately upload the selected files
    addImageToProduct(files, e);
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  //Add image to a product
  const addImageToProduct = async (files, e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();

    // Append each file to the form data
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/product/${id}/images`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );

      console.log("Images uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
    // finally {
    //   await getDataForEdit();
    // }
  };

  //delete single image
  const deleteSingleImage = async (imgId) => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com/ah/api/v1/product/${id}/single-image/${imgId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Deleted Successfully...");

      // Call to refresh or fetch updated data instead of adding images
      getDataForEdit();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image.");
    }
  };

  const getManufacturerNames = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/manufacturer/names?search=${searchManufacturerQuery}`,
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
    getManufacturerNames();
    const delayDebounceFn = setTimeout(() => {
      if (searchManufacturerQuery) {
        getManufacturerNames(searchManufacturerQuery);
      } else {
        getManufacturerNames("");
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchManufacturerQuery]);

  const toggleManuId = (event) => {
    event.preventDefault();
    setManuIdOpen(!manuIdOpen);
  };

  const handleManuIdChange = (e) => {
    const { name, value } = e.target;
    setProductValues({
      ...productValues,
      [name]: value,
    });
  };

  const selectedGeneric = genericsMap.find(
    (generic) => generic._id === productValues.genericID
  );

  const selectedMAnufacturer = manufacturerNamesId?.data?.find(
    (manufacturer) => manufacturer._id === productValues.manufacturerID
  );

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };

  // Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };

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
                    className={`${activeSection === "name"
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
                    className={`${activeSection === "description"
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
                    className={`${activeSection === "shortDescription"
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
                    className={`${activeSection === "moreInformation"
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
                    className={`${activeSection === "faq"
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
                    className={`${activeSection === "additionalInformation"
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
                    className={`${activeSection === "sideEffects"
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
                    className={`${activeSection === "yes-no"
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
                    className={`${activeSection === "meta"
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
                    className={`${activeSection === "variants"
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
              <div className="flex flex-col left border w-[70%] mt-5">
                {activeSection === "name" && (
                  <div className="flex flex-col gap-2 p-5">
                    <div className="flex flex-col w-full edit" id="Editinput">
                      <label className="font-semibold px-2 opacity-65 text-[12px]">
                        Product Name
                      </label>
                      <input
                        type="text"
                        placeholder="Product name"
                        className="h-[35px] border px-2 focus:outline-none"
                        onChange={handleChange}
                        name="title"
                        value={productValues.title}
                      />


                    </div>

                    <div className="flex gap-2">
                      <div className="flex flex-col w-full">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Generic Name
                        </label>
                        <input
                          type="text"
                          placeholder="Generic name"
                          name="generic"
                          value={productValues.generic}
                          className="h-[35px] border px-2 border px-2 focus:outline-none"
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
                          className="h-[35px] border px-2 border px-2 focus:outline-none"
                          onChange={handleChange}
                          value={productValues.treatment}
                          name="treatment"
                        />
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="flex flex-col w-1/2">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Purchase Note
                        </label>
                        <input
                          type="text"
                          placeholder="Purchase Note"
                          className="h-[35px] border px-2 border px-2 focus:outline-none"
                          onChange={handleChange}
                          value={productValues.purchaseNote}
                          name="purchaseNote"
                        />
                      </div>

                      <div className="flex flex-col w-1/2">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Compare Websites
                        </label>
                        <input
                          type="text"
                          placeholder="compareWebsites"
                          className={`border px-2 focus:outline-none h-[35px] border px-2 ${!isUrlValid ? "border-red-500" : ""
                            }`}
                          onChange={(e) => {
                            handleExChange(e);
                            handleChange(e);
                          }}
                          value={productValues.compareWebsites}
                          name="compareWebsites"
                        />
                        {/* {!isUrlValid && (
                          <div className="text-red-500">Invalid URL</div>
                        )} */}
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="flex flex-col w-1/2">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Origin Country
                        </label>
                        <input
                          type="text"
                          placeholder="Origin Country"
                          className="h-[35px] border px-2 focus:outline-none"
                          onChange={handleChange}
                          value={productValues.originCountry}
                          name="originCountry"
                        />
                      </div>

                      <div className="flex flex-col w-1/2">
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
                    <div className="flex flex-col w-full">
                      <label className="font-semibold px-2 opacity-65 text-[12px]">
                        Manufacturer Name
                      </label>
                      <input
                        type="text"
                        placeholder="manufacturer"
                        className="h-[35px] border px-2 border px-2 focus:outline-none"
                        onChange={handleChange}
                        name="manufacturer"
                        value={productValues.manufacturer}
                      />
                    </div>
                  </div>
                )}

                {activeSection === "description" && (
                  <div className="flex flex-col gap-2 px-5 py-1">
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
                    </div>
                  </div>
                )}

                {activeSection === "shortDescription" && (
                  <div className="flex flex-col gap-2 px-5 py-1">
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
                  <div className="flex flex-col gap-2 px-5 py-1">
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
                  <div className="flex flex-col gap-2 px-5 py-1">
                    <label className="px-3 font-bold">Faq</label>
                    <div>
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
                  <div className="flex flex-col gap-2 px-5 py-1">
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
                  <div className="flex flex-col gap-2 px-5 py-1">
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
                  <div className="flex flex-col gap-10 justify-center items-center p-5">
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
                        <label className="px-3 font-bold">RX medicine</label>
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

                    <div className="flex gap-10">
                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">
                          IsDiscontinued?
                        </label>
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

                      <div className="flex flex-col justify-start gap-2">
                        <label className="px-3 font-bold">Product Type?</label>
                        <div className="relative inline-block text-left">
                          <select
                            name="productType"
                            value={productValues.productType}
                            onChange={(event) => {
                              const value = event.target.value;
                              setProductValues((prevValues) => ({
                                ...prevValues,
                                productType: value,
                              }));
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            <option value="OTC">OTC</option>
                            <option value="FMHG">FMHG</option>
                            <option value="FMCG">FMCG</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="px-3 font-bold">
                        Is Prescription Mandatory?
                      </label>
                      <div className="relative inline-block text-left">
                        <select
                          name="isVisible"
                          value={productValues.isPrescriptionMandatory}
                          onChange={(event) => {
                            const value = event.target.value === "true";
                            setProductValues((prevValues) => ({
                              ...prevValues,
                              isPrescriptionMandatory: value,
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
                    <div className="flex flex-col justify-center w-[500px]">
                      <div className="flex flex-col w-full p-2">
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

                      <div className="flex flex-col w-full p-2">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Meta Description
                        </label>
                        <textarea
                          type="text"
                          placeholder="Description"
                          className="border px-2 focus:outline-none h-[100px]"
                          onChange={handleChange}
                          name="metaDescription"
                          value={productValues.metaDescription}
                        />
                      </div>

                      <div className="flex flex-col w-full p-2">
                        <label className="font-semibold px-2 opacity-65 text-[12px]">
                          Meta Tags
                        </label>

                        <textarea
                          type="text"
                          name="metaTags"
                          placeholder="Enter tags"
                          className=" border px-2 focus:outline-none h-[100px]"
                          value={productValues.metaTags}
                          onChange={handleMetaTagChange}
                        />

                        {/* <button
                            onClick={handleAddMetaTag}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Add Tags
                          </button> */}
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
                            <div className="flex gap-5">
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
                                  name={`variants[${index}].packSize`}
                                  onChange={handleVariantChange}
                                  type="text"
                                  placeholder="packSize"
                                  className="h-[35px] border px-2"
                                />
                              </div>

                              <div className="flex flex-col w-[165px]">
                                <label className="font-semibold px-2 opacity-65 text-[12px]">
                                  ID
                                </label>

                                <input
                                  value={variant?._id || ""}
                                  name={`variants[${index}]._id`}
                                  readOnly
                                  type="text"
                                  placeholder={!variant?._id ? "Enter ID" : ""}
                                  className="h-[35px] text-black border px-2"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-5 justify-around">
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
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Margin India
                              </label>
                              <input
                                name={`variants[${index}].marginIndia`}
                                value={variant.marginIndia}
                                type="number"
                                placeholder="Margin"
                                className="h-[35px] border px-2 focus:outline-none"
                                onChange={handleVariantChange}
                              />
                            </div>
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Bangladesh
                              </label>
                              <input
                                name={`variants[${index}].marginBangladesh`}
                                value={variant.marginBangladesh}
                                type="number"
                                placeholder="Margin"
                                className="h-[35px] border px-2 focus:outline-none"
                                onChange={handleVariantChange}
                              />
                            </div>
                            <div className="flex flex-col w-[100px]">
                              <label className="font-semibold px-2 opacity-65 text-[12px]">
                                Margin Nepal
                              </label>
                              <input
                                name={`variants[${index}].marginNepal`}
                                value={variant.marginNepal}
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
                        <div className="flex justify-around">
                          <div
                            key={index}
                            className="flex justify-center items-center mb-5"
                          >
                            <button
                              type="button"
                              className="mt-2 bg-red-500 text-white px-4 py-1 rounded self-end"
                              onClick={() => handleRemoveVariant(index)}
                            >
                              Remove variant
                            </button>
                          </div>
                          <div className="flex justify-center mb-5">
                            <button
                              type="button"
                              className="bg-blue-500 mt-2 text-white px-4 py-1 rounded self-end"
                              onClick={addVariant}
                            >
                              Add Variant
                            </button>
                          </div>
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
                  <label className="font-bold ml-[15px]" >All Categories</label>
                  <button
                    type="button"
                    onClick={toggleOpen}
                    className="focus:outline-none mr-[10px]"

                  >
                    {isOpen ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>
                </div>
                <div
                  className={`category-list mt-3 ${isOpen ? "h-[300px] overflow-y-auto" : "h-0 overflow-hidden"
                    } transition-all duration-300`}
                >
                  <input
                    type="text"
                    className="w-full px-2 py-1"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {hierarchyData?.map((item) => (
                    <div className="border px-2 p-1" key={item._id}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={item._id}
                          name="categoryID"
                          value={item._id}
                          className="mr-2"
                          onChange={(e) => handleCheckboxChange(e, item._id)} // Pass category ID explicitly
                          checked={productValues.categoryID.includes(item._id)} // Keep track of checked status
                        />
                        <label htmlFor={item._id} className="font-normal">
                          {item.name}
                        </label>
                      </div>
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
                    className={`tag-list mt-3 ${productTags
                        ? "h-auto overflow-y-auto"
                        : "h-0 overflow-hidden"
                      } transition-all duration-300`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-around">
                        <input
                          type="text"
                          name="tags"
                          placeholder="Enter tags"
                          className="h-[35px] border px-2 w-full"
                          onChange={handleProductTagChange}
                          value={productValues.tags}
                        />
                        {/* <button
                          type="button"
                          onClick={handleAddTag}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Add
                        </button> */}
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
                  className={`upload-image mt-3 ${isImageOpen
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
                      <div className="flex flex-wrap gap-2"></div>
                    )}
                  </div>
                  <div className="grid grid-cols-3 border-[1px] border-gray-300 rounded-xl p-2 gap-2 ">
                    {productValues?.images?.map((image) => (
                      <div key={image._id} className="flex gap-2">
                        <div className="border-[1px] border-gray-300 rounded-xl p-2 relative group">
                          <img src={image.url} alt="Image" />
                          <RxCross2
                            onClick={() => deleteSingleImage(image._id)}
                            className="text-red-800 absolute top-[-6px] left-[60px] cursor-pointer hidden group-hover:block"
                          />
                        </div>
                      </div>
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
                  className={`generic-map mt-3 ${genericsOpen
                      ? "h-[250px] overflow-y-auto"
                      : "h-0 overflow-hidden"
                    } transition-all duration-300`}
                >
                  {/* Display selected generic name */}
                  {selectedGeneric && (
                    <div className="mb-2 font-semibold text-gray-700">
                      {selectedGeneric.name}
                    </div>
                  )}
                  <div>
                    <input
                      type="text"
                      className="w-full px-2 py-1"
                      placeholder="Search..."
                      value={searchGenericQuery}
                      onChange={(e) => setSearchGenericQuery(e.target.value)}
                    />
                    {genericsMap?.map((generic) => (
                      <div key={generic?._id} className="flex flex-col">
                        <div className="flex gap-2">
                          <input
                            type="radio"
                            name="genericID"
                            value={generic?._id}
                            onChange={handleRadioChange}
                            checked={productValues.genericID === generic._id}
                          />
                          <p>{generic?.name}</p>
                        </div>

                        <div className="bg-black h-[1px] w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* manufacturer mapping */}
              <div className="mt-5 product-tags border rounded-xl p-3 fixed-width-card">
                <div className="flex justify-between items-center px-3">
                  <label className="font-bold">Manufacturer Id</label>
                  <button onClick={toggleManuId} className="focus:outline-none">
                    {manuIdOpen ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </button>
                </div>

                <div
                  className={`generic-map mt-3 ${manuIdOpen
                      ? "h-[300px] overflow-y-auto"
                      : "h-0 overflow-hidden"
                    } transition-all duration-300`}
                >
                  {selectedMAnufacturer && (
                    <div className="mb-2 font-semibold text-gray-700">
                      {selectedMAnufacturer.name}
                    </div>
                  )}
                  <div>
                    <input
                      type="text"
                      className="w-full px-2 py-1"
                      placeholder="Search..."
                      value={searchManufacturerQuery}
                      onChange={(e) =>
                        setSearchManufacturerQuery(e.target.value)
                      }
                    />

                    {manufacturerNamesId?.data?.map((manufacturer) => (
                      <div key={manufacturer?.id} className="">
                        <div className="flex gap-2">
                          <input
                            type="radio"
                            name="manufacturerID"
                            value={manufacturer?._id}
                            onChange={handleManuIdChange}
                            checked={
                              productValues.manufacturerID === manufacturer._id
                            }
                          />
                          <p>{manufacturer?.name}</p>
                        </div>
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
              style={{ padding: "12px" }}
              disabled={updateLoaderBtn}

            >
              {updateLoaderBtn ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Updating Data...
                </div>
              ) : (
                "update data"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="">
        {/* Scroll buttons */}
        <div className="fixed right-10 bottom-10 flex flex-col justify-end items-end gap-2">
          {/* Scroll to top button */}
          <div
            onClick={scrollToTop}
            className="bg-green-400 h-[40px] w-[40px] rounded-full flex justify-center items-center cursor-pointer"
          >
            <BiArrowToTop className="text-[20px] font-bold" />
          </div>

          {/* Scroll to bottom button */}
          <div
            onClick={scrollToBottom}
            className="bg-green-400 h-[40px] w-[40px] rounded-full flex justify-center items-center cursor-pointer"
          >
            <BiArrowFromTop className="text-[20px] font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
