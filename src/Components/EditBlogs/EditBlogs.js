import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const EditBlogs = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Handle image selection
 

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    topicCategory: [], // Array to store topics
    category: "",
    image: null,
    timeToRead: "",
    meta: { title: "", description: "", keywords: "" }, // Object for meta
    tags: [], // String for tags
    published: false,
    content: "",
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setFormData((prev) => ({
      ...prev, // Spread the previous state
      image: file, // Update the image property
    }));
  };

  const topics = [
    "Dental Health",
    "Diabetes Management",
    "Hair Health",
    "Digestive Health",
    "Best Hospital Services",
    "General Health",
    "Healthcare Essentials",
    "Heart Conditions",
    "Insurance",
    "Mental Health",
    "Neurology",
    "Oral and Dental",
    "Orthopedic Conditions",
    "Respiratory Health",
    "Sexual Wellness",
    "Skin Care",
  ];

  

  const handleMetaChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [key]: value,
      },
    }));
  };

  // Handle tags change
  const handleTagsChange = (e) => {
    const tagsArray = e.target.value
      .split(",") // Split the input string by commas
      .map((tag) => tag.trim()) // Trim whitespace around each tag
      .filter((tag) => tag !== ""); // Remove empty tags
  
    setFormData((prev) => ({
      ...prev,
      tags: tagsArray, // Set the tags as an array of strings
    }));
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle content change
  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  // Toggle category list open/close
  const toggleOpen = () => setIsOpen(!isOpen);

  // Handle checkbox change for topics
  const handleCheckboxChange = (topic) => {
    setFormData((prev) => {
      const newTopicCategory = prev.topicCategory.includes(topic)
        ? prev.topicCategory.filter((item) => item !== topic) // Remove if already selected
        : [...prev.topicCategory, topic]; // Add if not selected
      return { ...prev, topicCategory: newTopicCategory };
    });
  };

  // Fetch and set blog data on component load
  useEffect(() => {
    const showAllBlogs = async () => {
      try {
        const response = await axios.get(
          `https://api.assetorix.com/ah/api/v1/blog/admin/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );

        const blogData = response.data.blog;
        console.log("blogData", blogData);

        setFormData({
          title: blogData?.title || "",
          topicCategory: blogData?.topicCategory || [], // Array for topicCategory
          category: blogData?.category || "",
          image: blogData?.image || null,
          timeToRead: blogData?.timeToRead || "",
          meta: blogData?.meta || { title: "", description: "", keywords: "" }, // Ensure it's an object
          tags: blogData?.tags || "", // String for tags
          published: blogData?.published || false,
          content: blogData?.content || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    showAllBlogs();
  }, [id]);

  const updatedBlog = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Append image if it exists
    if (formData.image) {
      data.append("blog", formData.image);
    }

    try {
      const response = await axios.patch(
        `https://api.assetorix.com/ah/api/v1/blog/${id}`,
        data, // Send the FormData  
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Blog updated successfully...");
      console.log("Blog updated successfully", response.data);
      navigate("/show-blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Fetch categories on component load
  useEffect(() => {
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
        setHierarchyData(response.data); // Store categories in hierarchyData
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getHierarchy();
  }, []);

 
  // Recursive function to render radio buttons for categories and subcategories
  const renderCategoryRadios = (categories) => {
    return categories.map((category) => (
      <div key={category._id} className="ml-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="category"
            value={category._id} // Use category id as the value
            checked={formData.category === category._id} // Check if the current category matches
            onChange={handleInputChange}
            className="form-radio"
          />
          <span className="ml-2">{category.name}</span>
        </label>
        {category.children && category.children.length > 0 && (
          <div className="ml-4">{renderCategoryRadios(category.children)}</div>
        )}
      </div>
    ));
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };

  // Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    console.log("Arnab");
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-md transition-all duration-500 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Edit Blogs
      </h2>
      <form className="space-y-6" onSubmit={updatedBlog}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (min 6 words)
          </label>
          <input
            type="text"
            name="title"
            value={formData?.title}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the blog title"
          />
        </div>

        <div>
          <img className="h-[38vh] w-full transition-all duration-300 rounded-lg " src={formData?.image} alt="" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Change Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md text-left transition-transform duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {formData.topicCategory.length > 0
              ? formData.topicCategory.join(", ")
              : "Select topics"}
          </button>
          {dropdownOpen && (
            <div className="border border-gray-300 rounded-md mt-1 p-2 bg-white shadow-md transition-opacity duration-300">
              {topics.map((topic) => (
                <label key={topic} className="block">
                  <input
                    type="checkbox"
                    value={topic}
                    checked={formData.topicCategory.includes(topic)}
                    onChange={() => handleCheckboxChange(topic)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  {topic}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time to Read (minutes)
            </label>
            <select
              name="timeToRead"
              value={formData.timeToRead}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[
                "1 Min",
                "2 Min",
                "3 Min",
                "4 Min",
                "5 Min",
                "6 Min",
                "7 Min",
                "8 Min",
                "9 Min",
                "10 Min",
              ].map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Published Status
            </label>
            <select
              name="published"
              value={formData.published}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={false}>Unpublished</option>
              <option value={true}>Published</option>
            </select>
          </div>
        </div>
        <div className="shadow-md p-3">
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

          {/* Conditionally render the category list */}
          {isOpen && (
            <div className="mt-4 h-[300px] overflow-y-scroll border border-gray-300 rounded-md p-4">
              <div className="mt-2">
                <div>
                  <input
                    type="text"
                    // value={hierarchyQuery}
                    className="w-full px-2 py-1"
                    placeholder="Search categories..."
                  // onChange={(e) => setHierarchyQuery(e.target.value)}
                  />
                </div>
                {hierarchyData?.map((item) => (
                  <div className="border px-2 p-1" key={item._id}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        value={item._id} // Use category id as the value
                        checked={formData.category === item._id} // Check if the current category matches
                        onChange={handleInputChange}
                        className="form-radio"
                      />
                      <label htmlFor={item._id} className="font-normal">
                        {item.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleTagsChange}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter tags"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta
          </label>
          <div className="space-y-2">
            <input
              type="text"
              name="meta.title"
              value={formData.meta.title}
              onChange={(e) => handleMetaChange("title", e.target.value)}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Meta Title"
            />
            <input
              type="text"
              name="meta.description"
              value={formData.meta.description}
              onChange={(e) => handleMetaChange("description", e.target.value)}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Meta Description"
            />
            <input
              type="text"
              name="meta.keywords"
              value={formData.meta.keywords}
              onChange={(e) => handleMetaChange("keywords", e.target.value)}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Meta Keywords"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <JoditEditor
            value={formData.content}
            onChange={handleDescriptionChange}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Update Blog
        </button>
      </form>
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

export default EditBlogs;
