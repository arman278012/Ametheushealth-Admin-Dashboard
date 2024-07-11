import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { getCategoryData } from "../../redux/slice/GetCategoryDataSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppContext } from "../../Context/ContextProvider";

const AllCategories = () => {
  const { allCategoryData, isLoading, isError, error } = useSelector(
    (state) => state.getCategoryData
  );
  const { editAllCattegoriesForm, setEditAllCategoriesForm } =
    useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState({});
  const [deleteAlert, setDeleteAlert] = useState(false);

  useEffect(() => {
    dispatch(getCategoryData());
  }, [dispatch]);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com:4100/ah/api/v1/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      toast.success("Data Deleted Successfully...");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const placeholderImage = "https://via.placeholder.com/150";

  return (
    <div className="overflow-x-auto p-5 bg-gray-300">
      <div className="mb-5 flex gap-2 justify-end">
        <input
          type="text"
          className="py-2 rounded-xl px-3"
          placeholder="Search..."
        />
        <button className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-3 rounded-xl">
          Search Categories
        </button>
      </div>

      <div>
        <div className="flex justify-start mb-5">
          <button className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white px-5 py-2 rounded-xl">
            Bulk Delete
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border-b">
              <input type="checkbox" />
            </th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b">Id</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border-b text-center">
                    <Skeleton circle={true} height={12} width={12} />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Skeleton circle={true} height={48} width={48} />
                  </td>
                  <td className="py-2 px-4 border-b text-[14px]">
                    <Skeleton width={`80%`} />
                  </td>
                  <td className="py-2 px-4 border-b text-[14px]">
                    <Skeleton width={`80%`} count={2} />
                  </td>
                  <td className="py-2 px-4 border-b text-[14px]">
                    <Skeleton width={`50%`} />
                  </td>
                  <td className="py-2 px-4 border-b text-[14px]">
                    <Skeleton width={`50%`} />
                  </td>
                  <td className="py-2 px-4 border-b text-[13px]">
                    <Skeleton width={`50%`} />
                  </td>
                </tr>
              ))
            : allCategoryData?.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border-b text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <img
                      src={item.image ? item.image : placeholderImage}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-[14px]">
                    {item.name}
                    <div className="flex gap-2">
                      <button
                        className="text-[#2271b1]"
                        onClick={setEditAllCategoriesForm(true)}
                      >
                        Edit
                      </button>{" "}
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        onClick={() => navigate(`/all-categories/${item._id}`)}
                      >
                        View
                      </button>{" "}
                      <span className="text-[#2271b1]">|</span>
                      <button
                        className="text-[#2271b1]"
                        onClick={() => setDeleteAlert(true)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-[14px]">
                    {item.description ? (
                      expanded[index] ? (
                        <>
                          {parse(`<p>${item.description}</p>`)}
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-blue-500 hover:underline"
                          >
                            Read less
                          </button>
                        </>
                      ) : (
                        <>
                          {parse(`<p>${item.description.slice(0, 50)}...</p>`)}
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-blue-500 hover:underline"
                          >
                            Read more
                          </button>
                        </>
                      )
                    ) : (
                      <span>No description available</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-[14px]">
                    <span className="text-green-600 font-semibold">
                      {item.slug}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-[14px]">
                    <span className="mr-3"> {item._id}</span>
                  </td>
                  <td className="py-2 px-0 border-b text-[13px]">
                    <span className=""> {item.createdAt.split("T")[0]}</span>
                  </td>
                  <div>
                    {deleteAlert && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 opacity-50"></div>
                        <div className="bg-white p-6 rounded-lg border-2  z-10">
                          <p className="text-lg mb-4">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleDelete(item._id)}
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
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCategories;
