import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppContext } from "../../Context/ContextProvider";
import { FaTimes } from "react-icons/fa";
import "./EditCategoryForm.css";
import { getCategoryData } from "../../redux/slice/GetCategoryDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectStoredId } from "../../redux/slice/GetIdSlice";
import axios from "axios";
import { fetchAddcategoryData } from "../../redux/slice/AddCategorySlice";
import JoditEditor from "jodit-react";
import { MdOutlineErrorOutline } from "react-icons/md";
import toast from "react-hot-toast";

const EditCategoryForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    parent: "",
    slug: "",
    description: "",
    metaTags: "",
    metaTitle: "",
    metaDescription: "",
    image: null,
    file: null,
  });

  const storedId = useSelector(selectStoredId); // Fetch stored ID from Redux store
  const { data } = useSelector((state) => state.AddCategory);

  console.log(storedId);

  const dispatch = useDispatch();
  const { setEditAllCategoriesForm } = useContext(AppContext);

  //getting data for editing
  const getDataForEdit = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/category/${storedId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log("1", response.data);
      const categoryData = response.data;
      console.log("2", response.data, categoryData);
      setFormValues({
        name: categoryData?.name || "",
        parent: categoryData?.parent || "",
        slug: categoryData?.slug || "",
        description: categoryData?.description || "",
        metaTags: categoryData?.metaTags || "",
        metaTitle: categoryData?.metaTitle || "",
        metaDescription: categoryData?.metaDescription || "",
        image: null,
        file: null,
      });
      setImageData(response.data);
      console.log(imageData);
      console.log("category", response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataForEdit();
  }, [storedId]);

  useEffect(() => {
    dispatch(fetchAddcategoryData());
    dispatch(getCategoryData());
  }, [dispatch]);

  const handleNext = () => {
    setIsSubmitting(true);
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (currentStep === 1) {
        formValues.parent = formValues.parent === "" ? null : formValues.parent;
        // Update Data API
        const response = await axios.patch(
          `https://api.assetorix.com/ah/api/v1/category/${storedId}`,
          formValues,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );
        toast.success("Data Updated...");
        getDataForEdit();
        console.log("Data ddfvdbfgb ", response.data);
        // Optionally handle response or set success message
      } else if (currentStep === 2) {
        // Upload Image API
        const formData = new FormData();
        formData.append("image", formValues.image);

        await axios.patch(
          `https://api.assetorix.com/ah/api/v1/category/${storedId}/image`,
          formData,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );

        toast.success("image Uploaded Successfully...");
        getDataForEdit();
        // Optionally handle response or set success message
      } else if (currentStep === 3) {
        // Upload Doc File API
        const formData = new FormData();
        formData.append("file", formValues.file);

        await axios.patch(
          `https://api.assetorix.com/ah/api/v1/category/${storedId}/docFile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );
        toast.success("File Changed Successfully...");
        getDataForEdit();
        // Optionally handle response or set success message
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  //for delete the image
  const handleDeleteImage = async () => {
    try {
      await axios.delete(
        `https://api.assetorix.com/ah/api/v1/category/${storedId}/image`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Image Deleted Successfully...");
      setImageData(null); // Remove the image from the state
      getDataForEdit();
      setDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  //for delete the Doc file
  const handleDeleteDocFile = async () => {
    try {
      await axios.delete(
        `https://api.assetorix.com/ah/api/v1/category/${storedId}/docFile`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setImageData({ ...imageData, docFile: null });
      toast.success("Document file deleted successfully");
      getDataForEdit();
      setDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting document file:", error);
      toast.error("Failed to delete document file");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 z-50 w-[80%] relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          onClick={() => setEditAllCategoriesForm(false)}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl mb-4 font-bold">Update Category Data</h2>
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
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <div className="flex gap-10">
                <div className="mb-4 w-[33%]">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  {loading ? (
                    <Skeleton height={40} />
                  ) : (
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formValues?.name || ""}
                      onChange={handleChange}
                    />
                  )}
                </div>

                <div className="mb-4 w-[33%]">
                  <div className=" flex flex-col ">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Parent Category
                    </label>
                    {loading ? (
                      <Skeleton height={40} />
                    ) : (
                      <select
                        name="parent"
                        value={formValues.parent}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value={""}>
                          <span className="font-bold">
                            Make Parent Category
                          </span>
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
                    )}
                  </div>
                </div>

                <div className="mb-4 w-[33%]">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="slug"
                  >
                    Slug
                  </label>
                  {loading ? (
                    <Skeleton height={40} />
                  ) : (
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="slug"
                      name="slug"
                      type="text"
                      placeholder="Enter slug"
                      value={formValues.slug}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="flex gap-2 relative group">
                  <p className="font-bold mb-1">Long Description</p>
                  <MdOutlineErrorOutline className="mt-1 text-[15px] text-black" />
                  <span className="absolute bottom-full left-[50px] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                    Long Description
                  </span>
                </div>
                {loading ? (
                  <Skeleton height={200} />
                ) : (
                  <JoditEditor
                    value={formValues.description}
                    onChange={(value) =>
                      handleChange({
                        target: {
                          name: "description",
                          value: value,
                        },
                      })
                    }
                  />
                )}
              </div>

              <div className="flex gap-10">
                <div className="mb-4 w-[75%]">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="metaTags"
                  >
                    Meta Tags
                  </label>
                  {loading ? (
                    <Skeleton height={40} />
                  ) : (
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="metaTags"
                      name="metaTags"
                      type="text"
                      placeholder="Enter meta tags"
                      value={formValues.metaTags}
                      onChange={handleChange}
                    />
                  )}
                </div>
                <div className="mb-4 w-[25%]">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="metaTitle"
                  >
                    Meta Title
                  </label>
                  {loading ? (
                    <Skeleton height={40} />
                  ) : (
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="metaTitle"
                      name="metaTitle"
                      type="text"
                      placeholder="Enter meta title"
                      value={formValues.metaTitle}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>

              <div className="mb-4 w-[100%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="metaDescription"
                >
                  Meta Description
                </label>
                {loading ? (
                  <Skeleton height={80} />
                ) : (
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="metaDescription"
                    name="metaDescription"
                    placeholder="Enter meta description"
                    value={formValues.metaDescription}
                    onChange={handleChange}
                  />
                )}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <>
                  <div className="mb-4 flex justify-between items-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Upload Image
                    </label>
                    {imageData && imageData.image ? (
                      <div className="flex items-center space-x-2">
                        <img
                          src={imageData.image}
                          alt="Uploaded"
                          className="w-20 h-20 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setDeleteAlert(true)}
                          className="bg-red-500 text-white hover:bg-red-700 w-[70px] h-[35px] rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <p className="font-semibold">No image here</p>
                    )}
                    {deleteAlert && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 opacity-50"></div>
                        <div className="bg-white p-6 rounded-lg border-2  z-10">
                          <p className="text-lg mb-4">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={handleDeleteImage}
                              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setDeleteAlert(false)}
                              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </>
              )}
            </>
          )}

          {currentStep === 3 && (
            <>
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <>
                  <div className="mb-4 flex justify-between items-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Upload Document File
                    </label>
                    {imageData && imageData.docFileURL ? (
                      <div className="flex items-center space-x-2">
                        <img
                          src="docfile.png" // Add the path to your document icon
                          alt="Uploaded Document"
                          className="w-20 h-20 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setDeleteAlert(true)}
                          className="bg-red-500 text-white hover:bg-red-700 w-[110px] h-[35px]"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span className="font-semibold">
                        No document file here
                      </span>
                    )}
                    {deleteAlert && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 opacity-50"></div>
                        <div className="bg-white p-6 rounded-lg border-2 z-10">
                          <p className="text-lg mb-4">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={handleDeleteDocFile}
                              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setDeleteAlert(false)}
                              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleChange}
                  />
                </>
              )}
            </>
          )}

          <div className="mt-5 flex justify-between gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl"
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={`bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 px-4 rounded-xl ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Next"}
            </button>
            {currentStep === 1 && (
              <button
                type="submit"
                className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 px-4 rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Update Data"}
              </button>
            )}
            {currentStep === 2 && (
              <button
                type="submit"
                className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 px-4 rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload Image"}
              </button>
            )}
            {currentStep === 3 && (
              <button
                type="submit"
                className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 px-4 rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload Doc File"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
