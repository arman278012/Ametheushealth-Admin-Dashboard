import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdMore } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { LiaQuestionSolid } from "react-icons/lia";
import { MdAssignmentAdd } from "react-icons/md";
import { DiHtml53dEffects } from "react-icons/di";
import { PiSelectionSlashFill } from "react-icons/pi";
import { Field } from "formik";
import JoditEditor from "jodit-react";

const EditProducts = () => {
  const { id } = useParams();

  const [activeSection, setActiveSection] = useState("name");
  const [productsData, setProductsData] = useState({});
  const [externalLink, setExternalLink] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
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
      console.log("productData 61", productData);
      setProductValues(
        {
          title: productData?.title || "",
          generic: productData.generic || "",
          treatment: productData.treatment || "",
          shortDescription: productData.shortDescription || "",
          description: productData.description || "",
          moreInformation: productData.moreInformation || "",
          faq: productData.faq || "",
          additionalInformation: productData.additionalInformation || "",
          sideEffects: productData.sideEffects || "",
          categoryID: productData.categoryID || "",
          tags: productData.tags || "",
          genericID: productData.genericID || "",
          isReturnable: productData.isReturnable || "",
          isPrescriptionRequired: productData.isPrescriptionRequired || "",
          isVisible: productData.isVisible || "",
          isFeatured: productData.isFeatured || "",
          isDiscontinued: productData.isDiscontinued || "",
          purchaseNote: productData.purchaseNote || "",
          externalLink: productData.externalLink || "",
          position: productData.position || "",
          metaTitle: productData.metaTitle || "",
          metaDescription: productData.metaDescription || "",
          metaTags: productData.metaTags || "",
          variants: [
            {
              sku: productData.variants[0].sku || "",
              packSize: productData.variants[0].packSize || "",
              price: productData.variants[0].price || "",
              salePrice: productData.variants[0].salePrice || "",
              margin: productData.variants[0].margin || "",
              minOrderQuantity: productData.variants[0].minOrderQuantity || "",
              maxOrderQuantity: productData.variants[0].maxOrderQuantity || "",
              isStockAvailable: productData.variants[0].isStockAvailable || "",
              currency: productData.variants[0].currency || "",
              weightUnit: productData.variants[0].weightUnit || "",
              widthUnit: productData.variants[0].widthUnit || "",
              lengthUnit: productData.variants[0].lengthUnit || "",
              heightUnit: productData.variants[0].heightUnit || "",
              weight: productData.variants[0].weight || "",
              length: productData.variants[0].length || "",
              height: productData.variants[0].height || "",
              width: productData.variants[0].width || "",
            },
          ],
        }
        // variants: [{}],
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataForEdit();
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

  return (
    <div className="main-div-parent p-5 bg-[#f0f0f1]">
      <p className="font-bold">Edit products</p>
      <div className="w-full">
        <form>
          <div className="w-full flex">
            <div className="w-[75%] flex left">
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
              <div className="flex flex-col gap-5 left p-3 border w-[70%] mt-5">
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
                        value={productValues.title}
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
                          value={productValues.generic}
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
                          value={productValues.treatment}
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
                        value={productValues.purchaseNote}
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
                      <label className="font-semibold px-2 opacity-65">
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
                              setFieldValue("isReturnable", value);
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option disabled>Select an option</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">
                          IsPrescriptionRequired?
                        </label>
                        <div className="relative inline-block text-left">
                          <select
                            as="select"
                            name="isPrescriptionRequired"
                            value={productValues.isPrescriptionRequired}
                            onChange={(event) => {
                              const value = event.target.value === "true";
                              setFieldValue("isPrescriptionRequired", value);
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option disabled>Select an option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-10">
                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">IsVisible?</label>
                        <div className="relative inline-block text-left">
                          <select
                            as="select"
                            name="isVisible"
                            value={productValues.isVisible}
                            onChange={(event) => {
                              const value = event.target.value === "true";
                              setFieldValue("isVisible", value);
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option disabled>Select an option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">IsFeatured?</label>
                        <div className="relative inline-block text-left">
                          <select
                            as="select"
                            name="isFeatured"
                            value={productValues.isFeatured}
                            onChange={(event) => {
                              const value = event.target.value === "true";
                              setFieldValue("isFeatured", value);
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                          >
                            <option disabled>Select an option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start gap-2">
                      <label className="px-3 font-bold">IsDiscontinued?</label>
                      <div className="relative inline-block text-left">
                        <select
                          as="select"
                          name="isDiscontinued"
                          value={productValues.isDiscontinued}
                          onChange={(event) => {
                            const value = event.target.value === "true";
                            setFieldValue("isDiscontinued", value);
                          }}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                        >
                          <option disabled>Select an option</option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
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
                          value={productValues.metaTitle}
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
                          value={productValues.metaDescription}
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        <label className="font-semibold px-2 opacity-65">
                          Meta Tags
                        </label>
                        <div className="flex gap-3">
                          <div name="metaTagsInput">
                            <input
                              type="text"
                              placeholder="Enter tags"
                              className="h-[35px] border px-2 w-[400px]"
                              //   {...field}
                              // onChange={(e) =>
                              //   handleMetaTagInputChange(e, setFieldValue)
                              // }
                              value={productValues.metaTagsInput}
                            />
                          </div>
                          <button
                            // onClick={(e) =>
                            //   handleAddMetaTag(e, values, setFieldValue)
                            // }
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
                    <>
                      <div className="w-[500px] flex flex-col gap-3">
                        <div className="flex gap-4">
                          <div className="flex flex-col w-[165px]">
                            <label className="font-semibold px-2 opacity-65">
                              SKU
                            </label>
                            <input
                              value={productValues.variants.sku}
                              //   name={`variants[${index}].sku`}
                              type="text"
                              placeholder="sku"
                              className="h-[35px] border px-2"
                            />
                          </div>
                          <div className="flex flex-col w-[165px]">
                            <label className="font-semibold px-2 opacity-65">
                              Packsize
                            </label>
                            <input
                              //   name={`variants[${index}].packSize`}
                              type="number"
                              placeholder="packsize"
                              className="h-[35px] border px-2 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col w-[165px]">
                            <label className="font-semibold px-2 opacity-65">
                              Margin
                            </label>
                            <input
                              //   name={`variants[${index}].margin`}
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
                            <input
                              //   name={`variants[${index}].price`}
                              type="number"
                              placeholder="price"
                              className="h-[35px] border px-2 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col w-[165px]">
                            <label className="font-semibold px-2 opacity-65">
                              Sale price
                            </label>
                            <input
                              //   name={`variants[${index}].salePrice`}
                              type="number"
                              placeholder="Sale price"
                              className="h-[35px] border px-2 focus:outline-none "
                            />
                          </div>
                          <div className="flex flex-col w-[165px]">
                            <label className="font-semibold px-2 opacity-65">
                              Stock Available
                            </label>
                            <input
                              as="select"
                              //   name={`variants[${index}].isStockAvailable`}
                              className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[155px]"
                            >
                              <option value={false}>No</option>
                              <option value={true}>Yes</option>
                            </input>
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex flex-col w-[165px]">
                            <label className="font-semibold px-2 opacity-65">
                              Min Order Qty
                            </label>
                            <input
                              //   name={`variants[${index}].minOrderQuantity`}
                              type="number"
                              placeholder="Minimum Order"
                              className="h-[35px] border px-2 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col w-[165px]">
                            <label className="font-semibold px-2 opacity-65">
                              Max order Qty
                            </label>
                            <input
                              //   name={`variants[${index}].maxOrderQuantity`}
                              type="number"
                              placeholder="Maximum order"
                              className="h-[35px] border px-2 focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col w-[165px]">
                            <label className="font-semibold px-2 opacity-65">
                              Currency
                            </label>
                            <input
                              as="select"
                              //   name={`variants[${index}].currency`}
                              className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[155px]"
                            >
                              <option value="₹">₹</option>
                              <option value="Euro">Euro</option>
                            </input>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-2 w-[120px]">
                            <label className="px-3 font-semibold opacity-65">
                              Weight Unit
                            </label>
                            <input
                              as="select"
                              //   name={`variants[${index}].weightUnit`}
                              className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                            >
                              <option value="kg">kg</option>
                              <option value="gm">gm</option>
                              <option value="mg">mg</option>
                            </input>
                          </div>
                          <div className="flex flex-col gap-2 w-[120px]">
                            <label className="px-3 font-semibold opacity-65">
                              Width Unit
                            </label>
                            <input
                              as="select"
                              //   name={`variants[${index}].widthUnit`}
                              className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                            >
                              <option value="m">m</option>
                              <option value="cm">cm</option>
                              <option value="mm">mm</option>
                            </input>
                          </div>
                          <div className="flex flex-col gap-2 w-[120px]">
                            <label className="px-3 font-semibold opacity-65">
                              Length Unit
                            </label>
                            <input
                              as="select"
                              //   name={`variants[${index}].lengthUnit`}
                              className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                            >
                              <option value="m">m</option>
                              <option value="cm">cm</option>
                              <option value="mm">mm</option>
                            </input>
                          </div>
                          <div className="flex flex-col gap-2 w-[120px]">
                            <label className="px-3 font-semibold opacity-65">
                              Height Unit
                            </label>
                            <input
                              as="select"
                              //   name={`variants[${index}].heightUnit`}
                              className="bg-white text-gray-700 px-4 py-1 rounded-md shadow-sm h-[35px] w-[120px]"
                            >
                              <option value="m">m</option>
                              <option value="cm">cm</option>
                              <option value="mm">mm</option>
                            </input>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col w-[120px]">
                            <label className="font-semibold px-2 opacity-65">
                              Weight
                            </label>
                            <input
                              //   name={`variants[${index}].weight`}
                              type="number"
                              placeholder="Weight"
                              className="h-[35px] border px-2 w-[120px] focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col w-[120px]">
                            <label className="font-semibold px-2 opacity-65">
                              Width
                            </label>
                            <input
                              //   name={`variants[${index}].width`}
                              type="number"
                              placeholder="Width"
                              className="h-[35px] border px-2 w-[120px] focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col w-[120px]">
                            <label className="font-semibold px-2 opacity-65">
                              Length
                            </label>
                            <input
                              //   name={`variants[${index}].length`}
                              type="number"
                              placeholder="Length"
                              className="h-[35px] border px-2 w-[120px] focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col w-[120px]">
                            <label className="font-semibold px-2 opacity-65">
                              Height
                            </label>
                            <input
                              //   name={`variants[${index}].height`}
                              type="number"
                              placeholder="Height"
                              className="h-[35px] border px-2 w-[120px] focus:outline-none"
                            />
                          </div>
                        </div>
                        {/* <button
                                type="button"
                                onClick={() => remove(index)}
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded self-end"
                              >
                                Remove
                              </button> */}
                      </div>
                    </>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[25%] right"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
