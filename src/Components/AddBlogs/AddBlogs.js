import React, { useEffect, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
  const [formData, setFormData] = useState({
    title: "",
    topicCategory: [],
    category: "",
    image: null,
    timeToRead: "",
    meta: [{ title: "", description: "", keywords: "" }],
    tags: [],
    published: false,
    content: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMetaChange = (index, field, value) => {
    const updatedMeta = [...formData.meta];
    updatedMeta[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      meta: updatedMeta,
    }));
  };

  const handleAddMeta = () => {
    setFormData((prevData) => ({
      ...prevData,
      meta: [...prevData.meta, { title: "", description: "", keywords: "" }],
    }));
  };

  console.log("object");

  const handleTagsChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  const handleCheckboxChange = (topic) => {
    setFormData((prevData) => {
      const { topicCategory } = prevData;
      if (topicCategory.includes(topic)) {
        return {
          ...prevData,
          topicCategory: topicCategory.filter((t) => t !== topic),
        };
      } else {
        return {
          ...prevData,
          topicCategory: [...topicCategory, topic],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "meta" || key === "tags") {
        submissionData.append(key, JSON.stringify(formData[key]));
      } else {
        submissionData.append(key, formData[key]);
      }
    });

    try {
      await axios.post(
        "https://api.assetorix.com:4100/ah/api/v1/blog",
        submissionData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log(formData);
      toast.success("Blog created Successfully...");
      if (response.status == 200) {
        navigate("/show-blogs");
      }
    } catch (error) {
      console.error("Error submitting the blog:", error);
    }
  };

  const getHierarchy = async (query = "") => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/category/hierarchy-names?search=${query}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setHierarchyData(response.data);
      console.log(hierarchyData);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCategories = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const renderCategory = (item) => {
    return (
      <div key={item._id} className="ml-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="category"
            value={item._id}
            checked={formData.category === item._id}
            onChange={() => handleCategoryChange(item._id)}
            className="mr-2"
          />
          {item.name}
        </label>
        {item.children && item.children.length > 0 && (
          <div className="ml-4">
            {item.children.map((child) => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getHierarchy();
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300 min-w-full">
      <div className="p-8 bg-white shadow-lg rounded-md w-full max-w-lg transition-all duration-500">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Create a Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title (min 6 words)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the blog title"
              required
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
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
                required
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
                <option value="false">Draft</option>
                <option value="true">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Information
            </label>
            {formData.meta.map((metaItem, index) => (
              <div key={index} className="space-y-2 mb-4">
                <input
                  type="text"
                  value={metaItem.title}
                  onChange={(e) =>
                    handleMetaChange(index, "title", e.target.value)
                  }
                  placeholder="Meta Title"
                  className="p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={metaItem.description}
                  onChange={(e) =>
                    handleMetaChange(index, "description", e.target.value)
                  }
                  placeholder="Meta Description"
                  className="p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={metaItem.keywords}
                  onChange={(e) =>
                    handleMetaChange(index, "keywords", e.target.value)
                  }
                  placeholder="Meta Keywords"
                  className="p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMeta}
              className="mt-2 text-blue-600 hover:underline"
            >
              Add another Meta
            </button>
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
              placeholder="Enter tags separated by commas"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
              <input
                type="text"
                className="w-full px-2 py-1"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="mt-2">
                {filterCategories(hierarchyData).map((item) =>
                  renderCategory(item)
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <JoditEditor
              value={formData.content}
              onChange={handleDescriptionChange}
              className="border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
