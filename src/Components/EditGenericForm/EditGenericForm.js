import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectGenericId } from "../../redux/slice/GetGenericIdSlice";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import JoditEditor from "jodit-react";
import { MdOutlineErrorOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditGenericForm = () => {
  const { setEditGenericForm } = useContext(AppContext);
  const genericId = useSelector(selectGenericId);
  console.log("Generic Id", genericId);

  const [genericData, setGenericData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    uses: "",
    works: "",
    sideEffects: "",
    expertAdvice: "",
    faq: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //getting details for editing
  const getGenericData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/generic/${genericId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      const data = response.data.data;
      setGenericData(data);
      setFormData({
        name: data.name,
        uses: data.uses,
        works: data.works,
        sideEffects: data.sideEffects,
        expertAdvice: data.expertAdvice,
        faq: data.faq,
        slug: data.slug,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const editGenericData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://api.assetorix.com:4100/ah/api/v1/generic/${genericId}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Data Edited successfully...");
      setEditGenericForm(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenericData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 z-50 w-[80%] relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          onClick={() => setEditGenericForm(false)}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl mb-4 font-bold">Edit Generic Form</h2>
        <div>
          <form onSubmit={editGenericData}>
            <div className="mb-4 w-[100%]">
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
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
            </div>

            <div className="mb-4 w-[100%]">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Slug
              </label>
              {loading ? (
                <Skeleton height={40} />
              ) : (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="slug"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.slug}
                  onChange={handleChange}
                />
              )}
            </div>

            <div>
              <div className="flex gap-2 relative group">
                <p className="font-bold mb-1">Uses</p>
                <MdOutlineErrorOutline className="mt-1 text-[15px] text-black" />
                <span className="absolute bottom-full left-[50px] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                  Uses
                </span>
              </div>
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <JoditEditor
                  value={formData.uses}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "uses",
                        value: value,
                      },
                    })
                  }
                />
              )}
            </div>

            <div>
              <div className="flex gap-2 relative group">
                <p className="font-bold mb-1">Works</p>
                <MdOutlineErrorOutline className="mt-1 text-[15px] text-black" />
                <span className="absolute bottom-full left-[50px] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                  Works
                </span>
              </div>
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <JoditEditor
                  value={formData.works}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "works",
                        value: value,
                      },
                    })
                  }
                />
              )}
            </div>

            <div>
              <div className="flex gap-2 relative group">
                <p className="font-bold mb-1">Side Effects</p>
                <MdOutlineErrorOutline className="mt-1 text-[15px] text-black" />
                <span className="absolute bottom-full left-[50px] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                  Side Effects
                </span>
              </div>
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <JoditEditor
                  value={formData.sideEffects}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "sideEffects",
                        value: value,
                      },
                    })
                  }
                />
              )}
            </div>

            <div>
              <div className="flex gap-2 relative group">
                <p className="font-bold mb-1">Expert Advice</p>
                <MdOutlineErrorOutline className="mt-1 text-[15px] text-black" />
                <span className="absolute bottom-full left-[50px] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                  Expert Advice
                </span>
              </div>
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <JoditEditor
                  value={formData.expertAdvice}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "expertAdvice",
                        value: value,
                      },
                    })
                  }
                />
              )}
            </div>

            <div>
              <div className="flex gap-2 relative group">
                <p className="font-bold mb-1">FAQ</p>
                <MdOutlineErrorOutline className="mt-1 text-[15px] text-black" />
                <span className="absolute bottom-full left-[50px] transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                  FAQ
                </span>
              </div>
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <JoditEditor
                  value={formData.faq}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "faq",
                        value: value,
                      },
                    })
                  }
                />
              )}
            </div>

            <div className="flex justify-center items-center mt-5">
              <button
                className="bg-[#13a3bc] hover:bg-[#13b6d5] px-3 py-1 rounded-md text-white"
                type="submit"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGenericForm;
