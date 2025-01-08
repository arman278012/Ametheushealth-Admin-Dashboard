import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Field, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddcategoryData } from "../../redux/slice/AddCategorySlice";
import "./AddCategory.css";
import { getCategoryData } from "../../redux/slice/GetCategoryDataSlice";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  image: "",
  docFileURL: "",
  parent: "",
  metaTitle: "",
  metaDescription: "",
  metaTags: "",
  faq: [
    {
      title: "",
      value: ""
    }
  ]
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  // description: Yup.string().required("Description is required"),
  // metaTitle: Yup.string().required("Meta title is required"),
  // metaDescription: Yup.string().required("Meta description is required"),
  // metaTags: Yup.string().required("Meta tags are required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.AddCategory);
  const { allCategoryData, isLoading, isError, error } = useSelector(
    (state) => state.getCategoryData
  );

  console.log(allCategoryData); // Check if categoryData is correctly fetched

  const [currentStep, setCurrentStep] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqs, setFaqs] = useState([{ title: "", value: "" }]);

  useEffect(() => {
    dispatch(fetchAddcategoryData());
    dispatch(getCategoryData());
  }, [dispatch]);

  const addCategory = async (values) => {
    try {
      if (!values.parent) {
        delete values.parent;
      }
      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/category`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setCategoryId(response.data.data._id);
      // navigate("/all-categories");
      return response.data.data._id;
    } catch (error) {
      console.log(error);
    }
  };

  console.log("imageId", categoryId);

  const addImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.patch(
        `https://api.assetorix.com/ah/api/v1/category/${categoryId}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const docFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("docFileURL", file);

      const response = await axios.patch(
        `https://api.assetorix.com/ah/api/v1/category/${categoryId}/docFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log(response.data);
      navigate("/all-categories"); // Navigate after document upload is successful
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async (values) => {
    setIsSubmitting(true);
    if (currentStep === 1) {
      const id = await addCategory(values);
      setCategoryId(id);
    }
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
    setIsSubmitting(false);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (currentStep === 2 && values.image) {
        await addImage(values.image);
      }
      if (currentStep === 3 && values.docFileURL) {
        await docFileUpload(values.docFileURL);
      } else if (currentStep === 3 && !values.docFileURL) {
        navigate("/all-categories"); // Navigate if no document is uploaded
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const editor = useRef(null);

  const config = {
    uploader: {
      insertImageAsBase64URI: true, // Allow base64 encoding of the image for direct insertion
      url: "your-upload-url", // Optional: Backend URL for image upload
      isSuccess: function (resp) {
        return !resp.error;
      },
      process: function (resp) {
        return {
          files: resp.files || [],
          path: resp.path,
          baseurl: resp.baseurl,
          error: resp.error,
        };
      },
      defaultHandlerSuccess: function (data) {
        console.log("Upload successful:", data);
      },
      error: function (e) {
        console.error("Upload error:", e);
      },
    },
    buttons: ["bold", "italic", "underline", "link", "image", "upload"], // Add image button to toolbar
  };

  // FAQ sections
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFaqs = [...faqs];
    updatedFaqs[index][name] = value;
    setFaqs(updatedFaqs);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { title: "", value: "" }]);
  };

  const handleRemoveFaq = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  return (
    <div className="bg-[#f0f0f1]">
      <div className="p-5 sm:w-[60vw] w-[100%] mx-auto">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-center text-2xl">Add New Category</p>
        </div>

        <div className="flex justify-center mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`stepper-item ${currentStep >= step ? "completed" : ""
                }`}
            >
              <div className="step">{step}</div>
            </div>
          ))}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="border-2 p-5">
              {currentStep === 1 && (
                <div className="mt-5">
                  <div className="flex flex-col gap-2">
                    <label className="px-3 font-bold">Name</label>
                    <input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter name here"
                      className="p-3 focus:outline-none rounded-xl h-[45px] AddCategoryinput"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Long Description</label>
                    <div>
                      <Field name="description">
                        {({ field }) => (
                          <JoditEditor
                            ref={editor}
                            tabIndex={1} // tabIndex of textarea
                            config={config}
                            value={values.description}
                            onBlur={(newContent) => console.log(newContent)}
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
                      {/* {errors.description && touched.description && (
                        <div className="text-red-500">{errors.description}</div>
                      )} */}
                    </div>
                  </div>

                  <div className="flex sm:flex-row flex-col gap-5 w-[100%]">
                    <div className="mt-5 flex flex-col gap-2 sm:w-[35%]">
                      <label className="px-3 font-bold">Parent Category</label>
                      <select
                        name="parent"
                        value={values.parent}
                        onChange={handleChange}
                        className="px-3 py-1 h-[45px] focus:outline-none rounded-xl bg-white AddCategoryinput"
                      >
                        <option
                          value=""
                          disabled
                          hidden
                          className="placeholder opacity-50"
                        >
                          Select parent category
                        </option>
                        {data?.map((item) => (
                          <React.Fragment key={item._id}>
                            <option value={item._id} className="font-bold">
                              {item.name}
                            </option>
                            {item.children &&
                              item.children.map((child) => (
                                <React.Fragment key={child._id}>
                                  <option value={child._id}>
                                    &nbsp; {child.name}
                                  </option>
                                  {child.children &&
                                    child.children.map((child2) => (
                                      <React.Fragment key={child2._id}>
                                        <option value={child2._id}>
                                          &nbsp; &nbsp; {child2.name}
                                        </option>
                                        {child2.children &&
                                          child2.children.map((child3) => (
                                            <React.Fragment key={child3._id}>
                                              <option value={child3._id}>
                                                &nbsp; &nbsp; &nbsp;{" "}
                                                {child3.name}
                                              </option>
                                              {child3.children &&
                                                child3.children.map(
                                                  (child4) => (
                                                    <React.Fragment
                                                      key={child4._id}
                                                    >
                                                      <option
                                                        value={child4._id}
                                                      >
                                                        &nbsp; &nbsp;
                                                        &nbsp;&nbsp; &nbsp;
                                                        &nbsp; {child4.name}
                                                      </option>
                                                    </React.Fragment>
                                                  )
                                                )}
                                            </React.Fragment>
                                          ))}
                                      </React.Fragment>
                                    ))}
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                      </select>
                    </div>

                    <div className="mt-5 flex flex-col sm:w-[65%] w-full gap-2">
                      <div className="flex flex-col gap-2">
                        <label className="px-3 font-bold">Meta Title</label>
                        <input
                          type="text"
                          name="metaTitle"
                          value={values.metaTitle}
                          onChange={handleChange}
                          placeholder="Enter meta title here"
                          className="p-3 border rounded-xl h-[45px] focus:outline-none"
                        />
                        {/* {errors.metaTitle && touched.metaTitle && (
                          <div className="text-red-500">{errors.metaTitle}</div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="px-3 font-bold">Meta Description</label>
                      <textarea
                        name="metaDescription"
                        value={values.metaDescription}
                        onChange={handleChange}
                        placeholder="Enter meta description here"
                        className="p-3 border rounded-xl outline-none focus:outline-none AddCategoryinput"
                      />
                      {/* {errors.metaDescription && touched.metaDescription && (
                        <div className="text-red-500">
                          {errors.metaDescription}
                        </div>
                      )} */}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="px-3 font-bold">Meta Tags</label>
                      <textarea
                        name="metaTags"
                        value={values.metaTags}
                        onChange={handleChange}
                        placeholder="Enter meta tags here"
                        className="p-3 border rounded-xl outline-none AddCategoryinput"
                      />
                      {/* {errors.metaTags && touched.metaTags && (
                        <div className="text-red-500">{errors.metaTags}</div>
                      )} */}
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <FieldArray name="faq">
                    {({ insert, remove }) => (
                      <div className="flex flex-col mt-5">
                        {/* <h3 className="text-lg font-bold mb-4">FAQs</h3> */}
                        {values.faq.map((faq, index) => (
                          <div key={index} className="mb-4 border rounded">
                            {/* FAQ Title */}
                            <div className="mb-2">
                              <label className="block text-sm font-bold mb-1 px-3 ">FAQ Title</label>
                              <Field
                                type="text"
                                name={`faq[${index}].title`}
                                value={faq.title}
                                onChange={handleChange}
                                className="p-3 border rounded-xl outline-none w-full"
                                placeholder="Enter FAQ Title"
                              />
                            </div>
                          
                            {/* FAQ Value */}
                            <div className="mb-2">
                              <label className="block text-sm font-bold mb-1 px-3 ">FAQ Value</label>
                              <Field
                                as="textarea"
                                name={`faq[${index}].value`}
                                value={faq.value}
                                onChange={handleChange}
                                className="p-3 border rounded-xl outline-none w-full"
                                placeholder="Enter FAQ Value"
                              />
                            </div>

                            {/* Remove FAQ Button */}
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Remove FAQ
                            </button>
                          </div>
                        ))}
                        {/* Add New FAQ Button */}
                        <button
                          type="button"
                          onClick={() => insert(values.faq.length, { title: "", value: "" })}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                        >
                          Add FAQ
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleNext(values)}
                      className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 rounded-xl"
                      disabled={
                        !values.name ||
                        // !values.description ||
                        // !values.metaTitle ||
                        // !values.metaDescription ||
                        // !values.metaTags ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? "Loading..." : "Next"}
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="px-3 font-bold">Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={async (event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("image", file);
                        await addImage(file); // Upload image as soon as it's selected
                      }}
                      className="p-3 border rounded-xl h-[45px]"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleNext(values)}
                      className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 rounded-xl"
                    // disabled={!values.image || isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Next"}
                    </button>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-xl mt-2"
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="px-3 font-bold">Upload Docs</label>
                    <input
                      type="file"
                      name="docFileURL"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("docFileURL", file);
                      }}
                      className="p-3 border rounded-xl h-[45px]"
                    // disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="submit"
                      className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 rounded-xl"
                    // disabled={!values.file || isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Data"}
                    </button>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-xl mt-2"
                    // disabled={isSubmitting}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCategory;
