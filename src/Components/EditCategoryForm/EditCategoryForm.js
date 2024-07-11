import React, { useContext, useEffect, useState } from "react";
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

const EditCategoryForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const dispatch = useDispatch();
  const { setEditAllCategoriesForm } = useContext(AppContext);

  useEffect(() => {
    const getDataForEdit = async () => {
      try {
        const response = await axios.get(
          `https://api.assetorix.com:4100/ah/api/v1/category/${storedId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );
        const categoryData = response.data.category;
        setFormValues({
          name: categoryData.name || "",
          parent: categoryData.parent || "",
          slug: categoryData.slug || "",
          description: categoryData.description || "",
          metaTags: categoryData.metaTags || "",
          metaTitle: categoryData.metaTitle || "",
          metaDescription: categoryData.metaDescription || "",
          image: null,
          file: null,
        });
      } catch (error) {
        console.log(error);
      }
    };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Submit form data
    setIsSubmitting(false);
  };

  const editCategory = async () => {
    try {
      const response = await axios.patch(
        `https://api.assetorix.com:4100/ah/api/v1/category/${storedId}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setEditAllCategoriesForm(false)}
      ></div>
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
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4 w-[33%]">
                  <div className=" flex flex-col gap-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Parent Category
                    </label>
                    <select
                      name="parent"
                      value={formValues.parent} // Bind selected value to formValues.parent
                      onChange={handleChange} // Handle change event
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                          {item.children.map((child) => (
                            <option value={child._id} key={child._id}>
                              &nbsp; {child.name}
                            </option>
                          ))}
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4 w-[33%]">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="slug"
                  >
                    Slug
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="slug"
                    name="slug"
                    type="text"
                    placeholder="Enter slug"
                    value={formValues.slug}
                    onChange={handleChange}
                  />
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
              </div>

              <div className="flex gap-10">
                <div className="mb-4 w-[75%]">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="metaTags"
                  >
                    Meta Tags
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="metaTags"
                    name="metaTags"
                    type="text"
                    placeholder="Enter meta tags"
                    value={formValues.metaTags}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 w-[25%]">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="metaTitle"
                  >
                    Meta Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="metaTitle"
                    name="metaTitle"
                    type="text"
                    placeholder="Enter meta title"
                    value={formValues.metaTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4 w-[100%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="metaDescription"
                >
                  Meta Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="metaDescription"
                  name="metaDescription"
                  placeholder="Enter meta description"
                  value={formValues.metaDescription}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="px-3 font-bold">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="p-3 border rounded-xl h-[45px]"
                  disabled={isSubmitting}
                />
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
                  onChange={handleChange}
                  className="p-3 border rounded-xl h-[45px]"
                  disabled={isSubmitting}
                />
              </div>
            </div>
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
            <button
              type="submit"
              className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 px-4 rounded-xl"
              disabled={isSubmitting}
              onClick={editCategory}
            >
              {isSubmitting ? "Saving..." : "Update Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
