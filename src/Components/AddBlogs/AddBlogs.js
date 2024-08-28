import React, { useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";

const AddBlogs = () => {
  const [formData, setFormData] = useState({
    title: "",
    topicCategory: [],
    image: null,
    timeToRead: "",
    meta: [{ title: "", description: "", keywords: "" }],
    tags: [],
    published: false,
    content: "", // This will hold the rich text editor value
  });

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
      content: value, // Update the content field
    }));
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
      alert("Blog submitted successfully");
    } catch (error) {
      console.error("Error submitting the blog:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create a Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title (min 6 words)
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter the blog title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Topic
          </label>
          <select
            name="topicCategory"
            value={formData.topicCategory}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a topic</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time to Read (minutes)
          </label>
          <select
            name="timeToRead"
            value={formData.timeToRead}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            {[1, 2, 3, 4, 5].map((min) => (
              <option key={min} value={min}>
                {min} min
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
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
                className="p-2 block w-full border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                value={metaItem.description}
                onChange={(e) =>
                  handleMetaChange(index, "description", e.target.value)
                }
                placeholder="Meta Description"
                className="p-2 block w-full border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                value={metaItem.keywords}
                onChange={(e) =>
                  handleMetaChange(index, "keywords", e.target.value)
                }
                placeholder="Meta Keywords"
                className="p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMeta}
            className="mt-2 text-blue-500 hover:underline"
          >
            Add another Meta
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
            placeholder="Enter tags separated by commas"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="published"
            value={formData.published}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value={false}>Draft</option>
            <option value={true}>Published</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 px-5 py-1">
          <label className="px-3 font-bold">Description</label>
          <div>
            <JoditEditor
              value={formData.content} // Make sure you're using the correct field
              onChange={
                (value) => handleDescriptionChange(value) // Pass value directly
              }
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlogs;
