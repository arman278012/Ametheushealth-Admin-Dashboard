import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import { Field, Formik } from "formik";
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
  file: "",
  parent: "",
  metaTitle: "",
  metaDescription: "",
  metaTags: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  metaTitle: Yup.string().required("Meta title is required"),
  metaDescription: Yup.string().required("Meta description is required"),
  metaTags: Yup.string().required("Meta tags are required"),
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
        `https://api.assetorix.com:4100/ah/api/v1/category`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setCategoryId(response.data.data._id);
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
        `https://api.assetorix.com:4100/ah/api/v1/category/${categoryId}/image`,
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
      formData.append("file", file);

      const response = await axios.patch(
        `https://api.assetorix.com:4100/ah/api/v1/category/${categoryId}/docFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      navigate("/all-categories");
      console.log(response.data);
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
    if (currentStep === 2 && values.image) {
      await addImage(values.image);
    }
    if (currentStep === 3 && values.file) {
      await docFileUpload(values.file);
    }
    setIsSubmitting(false);
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
              className={`stepper-item ${
                currentStep >= step ? "completed" : ""
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
                      className="p-3 border rounded-xl h-[45px]"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
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

                  <div className="flex sm:flex-row flex-col gap-5 w-[100%]">
                    <div className="mt-5 flex flex-col gap-2 sm:w-[35%]">
                      <label className="px-3 font-bold">Parent Category</label>
                      <select
                        name="parent"
                        value={values.parent}
                        onChange={handleChange}
                        className="px-3 py-1 h-[45px] focus:outline-none rounded-xl bg-white"
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
                          className="p-3 border rounded-xl h-[45px]"
                        />
                        {errors.metaTitle && touched.metaTitle && (
                          <div className="text-red-500">{errors.metaTitle}</div>
                        )}
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
                        className="p-3 border rounded-xl outline-none"
                      />
                      {errors.metaDescription && touched.metaDescription && (
                        <div className="text-red-500">
                          {errors.metaDescription}
                        </div>
                      )}
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
                        className="p-3 border rounded-xl outline-none"
                      />
                      {errors.metaTags && touched.metaTags && (
                        <div className="text-red-500">{errors.metaTags}</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleNext(values)}
                      className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 rounded-xl"
                      disabled={
                        !values.name ||
                        !values.description ||
                        !values.metaTitle ||
                        !values.metaDescription ||
                        !values.metaTags ||
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
                      disabled={!values.image || isSubmitting}
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
                      name="file"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("file", file);
                      }}
                      className="p-3 border rounded-xl h-[45px]"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="submit"
                      className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 rounded-xl"
                      disabled={!values.file || isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Data"}
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCategory;
